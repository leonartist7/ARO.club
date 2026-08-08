from pathlib import Path
p = Path("src/i18n/translations.js")
t = p.read_text(encoding="utf-8")

fr_nav_broken = """    nav: {
      explore: 'Explorer',
      mapView: 'Vue Carte',
      howItWorks: 'Comment Ça Marche',
      forTeachers: 'Pour Enseignants',
      leaderboard: 'Classement',
      getStarted: 'Commencer',
      signIn: 'Iniciar sesión',
      signUp: 'Registrarse',
      signIn: 'Se connecter',
      signUp: 'S'inscrire',
      findExperience: 'Encontrar una experiencia',
      startTeaching: 'Empezar a enseñar',
      adminConsole: 'Consola admin',
      home: 'Inicio',
      play: 'Jugar',
      bookings: 'Reservas',
      profile: 'Perfil',
      studentDashboard: 'Mi panel',
      favorites: 'Favoritos',
      findExperience: 'Trouver une expérience',
      startTeaching: 'Commencer à enseigner',
      adminConsole: 'Console admin',
      home: 'Accueil',
      play: 'Jouer',
      bookings: 'Réservations',
      profile: 'Profil',
      studentDashboard: 'Mon tableau de bord',
      favorites: 'Favoris',
      backToHome: "Retour à l'Accueil",
      myProfile: 'Mon Profil',
      teacherDashboard: 'Tableau de Bord',
      signOut: 'Déconnexion',
    },"""

fr_nav_clean = """    nav: {
      explore: 'Explorer',
      mapView: 'Vue Carte',
      howItWorks: 'Comment Ça Marche',
      forTeachers: 'Pour Enseignants',
      leaderboard: 'Classement',
      getStarted: 'Commencer',
      signIn: 'Se connecter',
      signUp: "S'inscrire",
      findExperience: 'Trouver une expérience',
      startTeaching: 'Commencer à enseigner',
      adminConsole: 'Console admin',
      home: 'Accueil',
      play: 'Jouer',
      bookings: 'Réservations',
      profile: 'Profil',
      studentDashboard: 'Mon tableau de bord',
      favorites: 'Favoris',
      backToHome: "Retour à l'Accueil",
      myProfile: 'Mon Profil',
      teacherDashboard: 'Tableau de Bord',
      signOut: 'Déconnexion',
    },"""

if fr_nav_broken not in t:
    # try with exact quote variants
    print("broken block not exact match, using regex")
    import re
    t2, n = re.subn(
        r"fr:\s*\{\s*// Navigation\s*nav:\s*\{[\s\S]*?signOut: 'Déconnexion',\s*\},",
        "fr: {\n    // Navigation\n" + fr_nav_clean,
        t,
        count=1,
    )
    print("regex replacements", n)
    t = t2
else:
    t = t.replace(fr_nav_broken, fr_nav_clean)
    print("exact replace ok")

# Ensure EN has findExperience etc
if "findExperience: 'Find an experience'" not in t:
    t = t.replace(
        "signUp: 'Sign up',\n      backToHome:",
        "signUp: 'Sign up',\n      findExperience: 'Find an experience',\n      startTeaching: 'Start teaching',\n      adminConsole: 'Admin console',\n      home: 'Home',\n      play: 'Play',\n      bookings: 'Bookings',\n      profile: 'Profile',\n      studentDashboard: 'My dashboard',\n      favorites: 'Favorites',\n      backToHome:",
        1,
    )

# ES nav - ensure signIn present
es_snip = Path("src/i18n/translations.js").read_text(encoding="utf-8")
# re-read after? we'll write then check

p.write_text(t, encoding="utf-8")

# Verify syntax via node
import subprocess
r = subprocess.run(["node", "--check", "src/i18n/translations.js"], capture_output=True, text=True)
print("node check", r.returncode, r.stderr[:300] if r.stderr else "ok")
for i, line in enumerate(t.splitlines(), 1):
    if "signIn" in line or "signUp" in line:
        print(i, line.strip())
