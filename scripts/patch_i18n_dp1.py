from pathlib import Path
import re

p = Path("src/i18n/translations.js")
t = p.read_text(encoding="utf-8")

# EN nav
if "findExperience: 'Find an experience'" not in t:
    t = t.replace(
        "getStarted: 'Get Started',\n      backToHome:",
        "getStarted: 'Get Started',\n      findExperience: 'Find an experience',\n      startTeaching: 'Start teaching',\n      adminConsole: 'Admin console',\n      home: 'Home',\n      play: 'Play',\n      bookings: 'Bookings',\n      profile: 'Profile',\n      studentDashboard: 'My dashboard',\n      favorites: 'Favorites',\n      backToHome:",
        1,
    )

if "trustVerified: 'Hand-verified teachers'" not in t:
    t = t.replace(
        "copyright: 'All rights reserved.',\n      privacyPolicy:",
        "copyright: 'All rights reserved.',\n      trustVerified: 'Hand-verified teachers',\n      trustAntiShame: 'Anti-shame guarantee',\n      privacyPolicy:",
        1,
    )

# FR nav - find French getStarted in nav
if t.count("findExperience") < 2:
    # Common FR labels
    for old in [
        "getStarted: 'Commencer',\n      backToHome:",
        "getStarted: 'Démarrer',\n      backToHome:",
        "getStarted: 'S\\'inscrire',\n      backToHome:",
    ]:
        if old in t:
            t = t.replace(
                old,
                old.replace(
                    "backToHome:",
                    "findExperience: 'Trouver une expérience',\n      startTeaching: 'Commencer à enseigner',\n      adminConsole: 'Console admin',\n      home: 'Accueil',\n      play: 'Jouer',\n      bookings: 'Réservations',\n      profile: 'Profil',\n      studentDashboard: 'Mon tableau de bord',\n      favorites: 'Favoris',\n      backToHome:",
                ),
                1,
            )
            break
    else:
        # inject after first French-looking nav block: after mapView: 'Vue Carte' area
        # Fallback: add after second getStarted occurrence
        parts = t.split("getStarted:")
        if len(parts) >= 3:
            # parts[0] en prefix, parts[1] en rest starts after first getStarted value...
            # safer approach: find fr: section nav
            m = re.search(r"(fr:\s*\{[\s\S]*?nav:\s*\{[\s\S]*?)(getStarted:\s*'[^']*',\n)", t)
            if m and "findExperience" not in m.group(0):
                t = t[: m.end(2)] + (
                    "      findExperience: 'Trouver une expérience',\n"
                    "      startTeaching: 'Commencer à enseigner',\n"
                    "      adminConsole: 'Console admin',\n"
                    "      home: 'Accueil',\n"
                    "      play: 'Jouer',\n"
                    "      bookings: 'Réservations',\n"
                    "      profile: 'Profil',\n"
                    "      studentDashboard: 'Mon tableau de bord',\n"
                    "      favorites: 'Favoris',\n"
                ) + t[m.end(2) :]

if t.count("trustVerified") < 2:
    t = t.replace(
        "copyright: 'Tous droits réservés.',\n      privacyPolicy:",
        "copyright: 'Tous droits réservés.',\n      trustVerified: 'Enseignants vérifiés à la main',\n      trustAntiShame: 'Garantie anti-honte',\n      privacyPolicy:",
        1,
    )

# ES
if t.count("findExperience") < 3:
    m = re.search(r"(es:\s*\{[\s\S]*?nav:\s*\{[\s\S]*?)(getStarted:\s*'[^']*',\n)", t)
    if m and "findExperience" not in m.group(0):
        t = t[: m.end(2)] + (
            "      findExperience: 'Encontrar una experiencia',\n"
            "      startTeaching: 'Empezar a enseñar',\n"
            "      adminConsole: 'Consola admin',\n"
            "      home: 'Inicio',\n"
            "      play: 'Jugar',\n"
            "      bookings: 'Reservas',\n"
            "      profile: 'Perfil',\n"
            "      studentDashboard: 'Mi panel',\n"
            "      favorites: 'Favoritos',\n"
        ) + t[m.end(2) :]

if t.count("trustVerified") < 3:
    t = t.replace(
        "copyright: 'Todos los derechos reservados.',\n      privacyPolicy:",
        "copyright: 'Todos los derechos reservados.',\n      trustVerified: 'Profesores verificados a mano',\n      trustAntiShame: 'Garantía anti-vergüenza',\n      privacyPolicy:",
        1,
    )

p.write_text(t, encoding="utf-8")
print("i18n findExperience", t.count("findExperience"), "trustVerified", t.count("trustVerified"))
# print fr nav snippet
for lang in ["en", "fr", "es"]:
    m = re.search(rf"{lang}:\s*\{{[\s\S]*?nav:\s*\{{([\s\S]*?)\n    \}},", t)
    if m:
        has = "findExperience" in m.group(1)
        print(lang, "nav has findExperience", has)
