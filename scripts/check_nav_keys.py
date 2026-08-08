from pathlib import Path
t = Path("src/i18n/translations.js").read_text(encoding="utf-8")
# EN nav keys
import re
for lang in ["en", "fr", "es"]:
    m = re.search(rf"{lang}:\s*\{{[\s\S]*?nav:\s*\{{([\s\S]*?)\n    \}},", t)
    if not m:
        print(lang, "nav not found")
        continue
    body = m.group(1)
    for k in ["signIn","signUp","findExperience","play","bookings","home","profile"]:
        print(lang, k, k+":" in body)
