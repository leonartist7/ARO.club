from pathlib import Path
t = Path("src/i18n/translations.js").read_text(encoding="utf-8")
for i, line in enumerate(t.splitlines(), 1):
    if "signIn" in line or "signUp" in line or "inscrire" in line:
        print(i, repr(line))
