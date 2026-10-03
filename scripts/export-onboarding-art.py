"""Deterministic responsive export for approved RB2 generated originals."""

from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "artifacts" / "ARO-RB2" / "originals"
OUTPUT = ROOT / "public" / "brand"
OUTPUT.mkdir(parents=True, exist_ok=True)

for name in ("learn", "teach", "connect"):
    with Image.open(SOURCE / f"{name}.png") as original:
        image = original.convert("RGB")
        for width in (640, 1280):
            height = round(image.height * width / image.width)
            resized = image.resize((width, height), Image.Resampling.LANCZOS)
            path = OUTPUT / f"onboarding-{name}-{width}.webp"
            for quality in (84, 78, 72, 66, 60):
                resized.save(path, "WEBP", quality=quality, method=6)
                if width != 640 or path.stat().st_size <= 250_000:
                    break
            print(f"{path.name} {width}x{height} {path.stat().st_size} bytes quality={quality}")
