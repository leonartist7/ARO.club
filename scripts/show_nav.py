from pathlib import Path
lines = Path("src/i18n/translations.js").read_text(encoding="utf-8").splitlines()
for i in range(385, 430):
    print(f"{i+1}: {lines[i]}")
print("---")
# find es nav
for i, line in enumerate(lines):
    if line.strip() == "es: {" or line.strip().startswith("es: {"):
        print("es at", i+1)
    if "nav: {" in line:
        print("nav at", i+1, line[:40])
