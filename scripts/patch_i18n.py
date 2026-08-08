from pathlib import Path
import re

p = Path("src/i18n/translations.js")
t = p.read_text(encoding="utf-8")

# EN home hero + additions
en_old = """    home: {
      hero: {
        title: 'Learn Languages Through',
        titleHighlight: 'Cultural Immersion',
        subtitle: 'Connect with local teachers for authentic, small-group experiences in amazing destinations',
        browseButton: 'Browse Experiences',
        howItWorksButton: 'How It Works',
      },
      languages: 'Popular Languages',
      stats: {
        experiences: 'Experiences',
        learners: 'Happy Learners',
        teachers: 'Expert Teachers',
        cities: 'Cities Worldwide',
      },
      featured: 'Featured Experiences',
      featuredSubtitle: 'Discover handpicked experiences from our community of expert teachers',
      recentlyViewed: 'Recently Viewed',"""

en_new = """    home: {
      hero: {
        title: "Don't just learn it.",
        titleHighlight: 'Live it.',
        subtitle: 'Real conversations with hand-verified teachers — in cafés, markets, and neighborhoods around the world.',
        browseButton: 'Find an experience',
        teachButton: 'Become a teacher',
        searchPlaceholder: 'City or language…',
        howItWorksButton: 'How It Works',
        learnCard: 'Learn',
        learnCardDesc: 'Warm up with games',
        liveCard: 'Live',
        liveCardDesc: 'Meet at a real café',
      },
      trustStrip: 'Every teacher hand-verified by a human',
      languages: 'Popular Languages',
      stats: {
        experiences: 'Experiences',
        learners: 'Happy Learners',
        teachers: 'Expert Teachers',
        cities: 'Cities Worldwide',
      },
      featured: 'Featured Experiences',
      featuredSubtitle: 'Handpicked tables from verified teachers',
      featuredEmpty: 'No featured experiences yet — explore the full menu.',
      seeAll: 'See all',
      recentlyViewed: 'Recently Viewed',
      loop: {
        title: 'The Loop',
        subtitle: 'Learn → Live → Belong',
        learn: {
          title: 'Learn',
          description: 'Warm up phrases and games before you go.',
        },
        live: {
          title: 'Live',
          description: 'Show up. Speak. Share a real table with a local.',
        },
        belong: {
          title: 'Belong',
          description: 'Earn streaks, friends, and the courage to keep going.',
        },
      },
      forTeachers: {
        title: 'Teach what you love. Earn on your terms.',
        description: 'Join hand-verified teachers hosting tables worldwide. Apply once — we review every human.',
        cta: 'Apply to teach',
      },"""

if en_old not in t:
    raise SystemExit('EN home block not found')
t = t.replace(en_old, en_new, 1)

# EN explore additions before experienceCard
en_explore_old = """      allLanguages: 'All Languages',
      allCities: 'All Cities',
      allLevels: 'All Levels',
    },

    // Experience Card
    experienceCard: {
      from: 'From',"""

en_explore_new = """      allLanguages: 'All Languages',
      allCities: 'All Cities',
      allLevels: 'All Levels',
      mapView: 'Map view',
      chips: {
        weekend: 'This weekend',
        online: 'Online',
        buddy: 'With a buddy',
        brave: 'Brave-o-meter',
      },
    },

    // Experience Card
    experienceCard: {
      from: 'From',"""

if en_explore_old not in t:
    raise SystemExit('EN explore block not found')
t = t.replace(en_explore_old, en_explore_new, 1)

# FR home
fr_old = """    home: {
      hero: {
        title: 'Apprenez les Langues par',
        titleHighlight: "l'Immersion Culturelle",
        subtitle: 'Connectez-vous avec des enseignants locaux pour des expériences authentiques en petits groupes',
        browseButton: 'Parcourir les Expériences',
        howItWorksButton: 'Comment Ça Marche',
      },
      languages: 'Langues Populaires',
      stats: {
        experiences: 'Expériences',
        learners: 'Apprenants Satisfaits',
        teachers: 'Enseignants Experts',
        cities: 'Villes dans le Monde',
      },
      featured: 'Expériences en Vedette',
      featuredSubtitle: 'Découvrez des expériences sélectionnées par notre communauté d\\'enseignants experts',
      recentlyViewed: 'Vues Récemment',"""

fr_new = """    home: {
      hero: {
        title: 'Ne l\\'apprenez pas seulement.',
        titleHighlight: 'Vivez-le.',
        subtitle: 'De vraies conversations avec des enseignants vérifiés — cafés, marchés et quartiers du monde entier.',
        browseButton: 'Trouver une expérience',
        teachButton: 'Devenir enseignant',
        searchPlaceholder: 'Ville ou langue…',
        howItWorksButton: 'Comment Ça Marche',
        learnCard: 'Apprendre',
        learnCardDesc: 'Échauffez-vous avec des jeux',
        liveCard: 'Vivre',
        liveCardDesc: 'Rendez-vous au café',
      },
      trustStrip: 'Chaque enseignant est vérifié par un humain',
      languages: 'Langues Populaires',
      stats: {
        experiences: 'Expériences',
        learners: 'Apprenants Satisfaits',
        teachers: 'Enseignants Experts',
        cities: 'Villes dans le Monde',
      },
      featured: 'Expériences en Vedette',
      featuredSubtitle: 'Tables sélectionnées par des enseignants vérifiés',
      featuredEmpty: 'Pas encore d\\'expériences en vedette — explorez le menu complet.',
      seeAll: 'Voir tout',
      recentlyViewed: 'Vues Récemment',
      loop: {
        title: 'La Boucle',
        subtitle: 'Apprendre → Vivre → Appartenir',
        learn: { title: 'Apprendre', description: 'Échauffez phrases et jeux avant d\\'y aller.' },
        live: { title: 'Vivre', description: 'Présentez-vous. Parlez. Partagez une vraie table.' },
        belong: { title: 'Appartenir', description: 'Gagnez des séries, des amis et le courage de continuer.' },
      },
      forTeachers: {
        title: 'Enseignez ce que vous aimez. Gagnez à votre rythme.',
        description: 'Rejoignez des enseignants vérifiés partout dans le monde. Une candidature — nous examinons chaque humain.',
        cta: 'Postuler pour enseigner',
      },"""

if fr_old not in t:
    raise SystemExit('FR home block not found')
t = t.replace(fr_old, fr_new, 1)

fr_explore_old = """      allLanguages: 'Toutes les Langues',
      allCities: 'Toutes les Villes',
      allLevels: 'Tous Niveaux',
    },

    // Experience Card
    experienceCard: {
      from: 'À partir de',"""

fr_explore_new = """      allLanguages: 'Toutes les Langues',
      allCities: 'Toutes les Villes',
      allLevels: 'Tous Niveaux',
      mapView: 'Vue carte',
      chips: {
        weekend: 'Ce week-end',
        online: 'En ligne',
        buddy: 'Avec un ami',
        brave: 'Brave-o-mètre',
      },
    },

    // Experience Card
    experienceCard: {
      from: 'À partir de',"""

if fr_explore_old not in t:
    raise SystemExit('FR explore block not found')
t = t.replace(fr_explore_old, fr_explore_new, 1)

# ES home
es_old = """    home: {
      hero: {
        title: 'Aprende Idiomas a Través de la',
        titleHighlight: 'Inmersión Cultural',
        subtitle: 'Conéctate con profesores locales para experiencias auténticas en grupos pequeños',
        browseButton: 'Explorar Experiencias',
        howItWorksButton: 'Cómo Funciona',
      },
      languages: 'Idiomas Populares',
      stats: {
        experiences: 'Experiencias',
        learners: 'Estudiantes Felices',
        teachers: 'Profesores Expertos',
        cities: 'Ciudades en el Mundo',
      },
      featured: 'Experiencias Destacadas',
      featuredSubtitle: 'Descubre experiencias seleccionadas de nuestra comunidad de profesores expertos',
      recentlyViewed: 'Vistas Recientemente',"""

es_new = """    home: {
      hero: {
        title: 'No solo lo aprendas.',
        titleHighlight: 'Vívelo.',
        subtitle: 'Conversaciones reales con profesores verificados — cafés, mercados y barrios del mundo.',
        browseButton: 'Encontrar una experiencia',
        teachButton: 'Ser profesor',
        searchPlaceholder: 'Ciudad o idioma…',
        howItWorksButton: 'Cómo Funciona',
        learnCard: 'Aprender',
        learnCardDesc: 'Calienta con juegos',
        liveCard: 'Vivir',
        liveCardDesc: 'Encuentro en un café real',
      },
      trustStrip: 'Cada profesor es verificado por un humano',
      languages: 'Idiomas Populares',
      stats: {
        experiences: 'Experiencias',
        learners: 'Estudiantes Felices',
        teachers: 'Profesores Expertos',
        cities: 'Ciudades en el Mundo',
      },
      featured: 'Experiencias Destacadas',
      featuredSubtitle: 'Mesas seleccionadas de profesores verificados',
      featuredEmpty: 'Aún no hay experiencias destacadas — explora el menú completo.',
      seeAll: 'Ver todo',
      recentlyViewed: 'Vistas Recientemente',
      loop: {
        title: 'El Bucle',
        subtitle: 'Aprender → Vivir → Pertenecer',
        learn: { title: 'Aprender', description: 'Calienta frases y juegos antes de ir.' },
        live: { title: 'Vivir', description: 'Aparece. Habla. Comparte una mesa real.' },
        belong: { title: 'Pertenecer', description: 'Gana rachas, amigos y el valor de seguir.' },
      },
      forTeachers: {
        title: 'Enseña lo que amas. Gana a tu ritmo.',
        description: 'Únete a profesores verificados en todo el mundo. Una solicitud — revisamos a cada humano.',
        cta: 'Solicitar para enseñar',
      },"""

if es_old not in t:
    raise SystemExit('ES home block not found')
t = t.replace(es_old, es_new, 1)

es_explore_old = """      allLanguages: 'Todos los Idiomas',
      allCities: 'Todas las Ciudades',
      allLevels: 'Todos los Niveles',
    },

    // Experience Card
    experienceCard: {
      from: 'Desde',"""

es_explore_new = """      allLanguages: 'Todos los Idiomas',
      allCities: 'Todas las Ciudades',
      allLevels: 'Todos los Niveles',
      mapView: 'Vista mapa',
      chips: {
        weekend: 'Este fin de semana',
        online: 'En línea',
        buddy: 'Con un amigo',
        brave: 'Brave-o-metro',
      },
    },

    // Experience Card
    experienceCard: {
      from: 'Desde',"""

if es_explore_old not in t:
    raise SystemExit('ES explore block not found')
t = t.replace(es_explore_old, es_explore_new, 1)

# CTA browse buttons
t = t.replace("browseButton: 'Browse Experiences',\n        teachButton: 'Become a Teacher',", "browseButton: 'Find an experience',\n        teachButton: 'Become a Teacher',", 1)

p.write_text(t, encoding="utf-8")
print("translations updated", "trustStrip" in t, "home.loop" not in t, "'The Loop'" in t, t.count("Brave-o"))
