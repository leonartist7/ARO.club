"""Responsive export for approved RB2 originals using a pinned encoder profile."""

import io
import platform
import sys
from pathlib import Path

import PIL
from PIL import Image
from PIL import features

PROFILE = {"python": "3.12.14", "pillow": "12.3.0", "libwebp": "1.6.0"}
CHECK = sys.argv[1:] == ["--check"]
if sys.argv[1:] and not CHECK:
    raise SystemExit("Usage: export-onboarding-art.py [--check]")

if platform.python_version() != PROFILE["python"]:
    raise RuntimeError(f"RB2 export needs CPython {PROFILE['python']}")
if PIL.__version__ != PROFILE["pillow"]:
    raise RuntimeError(f"RB2 export needs Pillow {PROFILE['pillow']}")
if features.version("webp") != PROFILE["libwebp"]:
    raise RuntimeError(f"RB2 export needs libwebp {PROFILE['libwebp']}")

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "artifacts" / "ARO-RB2" / "originals"
OUTPUT = ROOT / "public" / "brand"
if not CHECK:
    OUTPUT.mkdir(parents=True, exist_ok=True)

for name in ("learn", "teach", "teach-language-v2", "connect"):
    with Image.open(SOURCE / f"{name}.png") as original:
        image = original.convert("RGB")
        for width in (640, 1280):
            height = round(image.height * width / image.width)
            resized = image.resize((width, height), Image.Resampling.LANCZOS)
            path = OUTPUT / f"onboarding-{name}-{width}.webp"
            for quality in (84, 78, 72, 66, 60):
                buffer = io.BytesIO()
                resized.save(buffer, "WEBP", quality=quality, method=6)
                encoded = buffer.getvalue()
                if width != 640 or len(encoded) <= 250_000:
                    break
            if CHECK:
                if path.read_bytes() != encoded:
                    raise RuntimeError(f"{path.name} differs from the pinned export profile")
            else:
                path.write_bytes(encoded)
            print(f"{path.name} {width}x{height} {len(encoded)} bytes quality={quality}")
