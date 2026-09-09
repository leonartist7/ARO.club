"""Generate and verify the finite FV-1 WebP derivative set.

Run with the approved CPython/Pillow/libwebp profile. The generator writes only
the listed files under public/fv1; --check regenerates them in memory and checks
the checked-in manifest and bytes without modifying the repository.
"""
from __future__ import annotations

import hashlib
import io
import json
import platform
import sys
from pathlib import Path

import PIL
from PIL import Image, features

ROOT = Path(__file__).resolve().parents[2]
PUBLIC = ROOT / "public"
OUT = PUBLIC / "fv1"
PROFILE = {"python": "3.13.5", "pillow": "12.3.0", "libwebp": "1.6.0"}
SETS = {
    "aro-living-miniature-calgary-v1": (640, 1440),
    "aro-maya-expression-persona-v1": (480, 960),
    "aro-maya-profile-portrait-v1": (256, 384),
    "aro-passport-life-map-v1": (160, 640, 1440),
    "aro-portal-home-v1": (160, 640, 1440),
    "aro-repair-table-v1": (160, 640, 1440),
    "aro-river-light-circle-v1": (160, 640, 1440),
    "aro-season-discovery-v1": (640, 1440),
    "aro-shared-stories-table-v1": (160, 640, 1440),
}


def sha(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def ceiling(stem: str, width: int) -> int:
    if stem == "aro-maya-expression-persona-v1":
        return 250000 if width == 480 else 640000
    if "profile-portrait" in stem:
        return 40000
    # 160/640 variants are available to cards; strictest card budgets apply.
    return 20000 if width == 160 else 80000 if width == 640 else 400000


def encode(stem: str, width: int) -> tuple[bytes, dict]:
    source_path = PUBLIC / f"{stem}.png"
    with Image.open(source_path) as opened:
        original = opened.convert("RGBA" if stem == "aro-maya-expression-persona-v1" else "RGB")
    height = max(1, round(original.height * width / original.width))
    resized = original.resize((width, height), Image.Resampling.LANCZOS)
    persona = stem == "aro-maya-expression-persona-v1"
    attempts = [100] if persona else [82, 76, 70]
    for quality in attempts:
        out = io.BytesIO()
        kwargs = {"format": "WEBP", "quality": quality, "method": 6}
        if persona:
            kwargs.update({"lossless": True, "exact": True})
        resized.save(out, **kwargs)
        encoded = out.getvalue()
        if len(encoded) <= ceiling(stem, width):
            with Image.open(io.BytesIO(encoded)) as decoded:
                assert decoded.size == resized.size
                if persona:
                    assert decoded.convert("RGBA").tobytes() == resized.tobytes()
            return encoded, {
                "width": width, "height": height, "bytes": len(encoded), "sha256": sha(encoded),
                "quality": quality, "lossless": persona, "exact": persona, "method": 6,
                "ceiling": ceiling(stem, width),
            }
    raise RuntimeError(f"{stem}-{width} exceeds {ceiling(stem, width)} bytes")


def build() -> tuple[dict, dict[str, bytes]]:
    assert platform.python_version() == PROFILE["python"]
    assert PIL.__version__ == PROFILE["pillow"]
    assert features.version("webp") == PROFILE["libwebp"]
    assets, output = {}, {}
    for stem, widths in SETS.items():
        source = PUBLIC / f"{stem}.png"
        entries = []
        for width in widths:
            encoded, detail = encode(stem, width)
            name = f"{stem}-{width}.webp"
            entries.append({"file": name, **detail})
            output[name] = encoded
        with Image.open(source) as image:
            assets[f"/{source.name}"] = {
                "sourceSHA256": sha(source.read_bytes()), "sourceWidth": image.width,
                "sourceHeight": image.height, "derivatives": entries,
            }
    return {
        "version": 1, "encoder": {**PROFILE, "resize": "LANCZOS", "stripMetadata": True},
        "assets": assets,
    }, output


def main() -> None:
    manifest, output = build()
    manifest_bytes = (json.dumps(manifest, indent=2, sort_keys=True) + "\n").encode()
    target = OUT / "manifest.json"
    checking = sys.argv[1:] == ["--check"]
    if checking:
        assert target.read_bytes() == manifest_bytes, "manifest does not reproduce"
        expected = set(output) | {"manifest.json"}
        actual = {path.name for path in OUT.iterdir() if path.is_file()}
        assert actual == expected, f"unexpected output set: {actual ^ expected}"
        for name, encoded in output.items():
            assert (OUT / name).read_bytes() == encoded, f"{name} does not reproduce"
        print("FV1 media check passed: 9 sources, 23 deterministic derivatives")
        return
    OUT.mkdir(parents=True, exist_ok=True)
    for name, encoded in output.items():
        (OUT / name).write_bytes(encoded)
    target.write_bytes(manifest_bytes)
    print("FV1 media generated: 9 sources, 23 derivatives")


if __name__ == "__main__":
    main()
