from pathlib import Path
p = Path("src/i18n/translations.js")
t = p.read_text(encoding="utf-8")
if "signIn:" not in t:
    t = t.replace(
        "getStarted: 'Get Started',",
        "getStarted: 'Get Started',\n      signIn: 'Sign in',\n      signUp: 'Sign up',",
        1,
    )
# FR/ES best-effort
if t.count("signIn:") < 2:
    import re
    for lang, si, su in [
        ("fr", "Se connecter", "S'inscrire"),
        ("es", "Iniciar sesión", "Registrarse"),
    ]:
        m = re.search(rf"({lang}:\s*\{{[\s\S]*?nav:\s*\{{[\s\S]*?)(getStarted:\s*'[^']*',\n)", t)
        if m and "signIn:" not in m.group(0):
            t = t[:m.end(2)] + f"      signIn: '{si}',\n      signUp: '{su}',\n" + t[m.end(2):]
p.write_text(t, encoding="utf-8")
print("signIn count", t.count("signIn:"))
