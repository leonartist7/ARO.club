import { profileSignals } from '../../data/aroApp';

const signalTranslations = {
  fr: {
    wants: {
      'Practice conversational Spanish': 'Pratiquer l’espagnol conversationnel',
      'Make more time for making things': 'Prendre plus de temps pour créer',
      'Meet people outside my usual circles': 'Rencontrer des gens hors de mes cercles habituels',
    },
    brings: {
      'A warm table and good questions': 'Une table chaleureuse et de bonnes questions',
      'Beginner photography': 'Photographie débutante',
      'Patient facilitation': 'Animation patiente',
    },
    boundaries: {
      'Show my first name only': 'Afficher seulement mon prénom',
      'Keep precise location private': 'Garder ma localisation précise privée',
      'Ask before sharing contact details': 'Demander avant de partager mes coordonnées',
    },
  },
  es: {
    wants: {
      'Practice conversational Spanish': 'Practicar español conversacional',
      'Make more time for making things': 'Hacer más tiempo para crear cosas',
      'Meet people outside my usual circles': 'Conocer gente fuera de mis círculos habituales',
    },
    brings: {
      'A warm table and good questions': 'Una mesa cálida y buenas preguntas',
      'Beginner photography': 'Fotografía para principiantes',
      'Patient facilitation': 'Facilitación paciente',
    },
    boundaries: {
      'Show my first name only': 'Mostrar solo mi nombre',
      'Keep precise location private': 'Mantener privada mi ubicación precisa',
      'Ask before sharing contact details': 'Preguntar antes de compartir datos de contacto',
    },
  },
};

function localizedSignals(language, group) {
  return profileSignals[group].map((signal) => signalTranslations[language]?.[group]?.[signal] ?? signal);
}

export const fv1PersonalCopy = {
  en: {
    profile: {
      eyebrow: 'Identity in motion',
      settingsLabel: 'Open settings',
      fieldEyebrow: 'Your personal field',
      fieldTitle: 'The parts of you that make a next thing possible.',
      previewLabel: 'Preview field',
      portraitAlt: 'Illustrated portrait of Maya in Calgary at golden hour',
      portraitCaption: 'Maya · not a score',
      instruction: 'Choose a signal to see one thread in Maya’s life. Nothing here is saved or shared in this preview.',
      expressEyebrow: 'A visual layer for you',
      expressTitle: 'Express your world.',
      expressBody: 'Preview a full-body persona, the small things you carry, and the atmosphere that feels like you.',
      expressLink: 'Open expression preview',
      selectedEyebrow: 'Selected signal',
      connectionNote: 'In a real ARO flow, these are connections—not labels. They help show what could form next.',
      privacyEyebrow: 'Private by design',
      privacyTitle: 'You decide what belongs in the field.',
      privacyBody: 'This visual prototype uses Maya’s static preview data only. It has not saved, matched, or shared anything.',
      privacyButton: 'How this becomes real later',
      privacyDetail: 'P1 will require explicit consent, owner-only storage, editing, and deletion controls before personal signals can influence anything. None of that exists on this screen yet.',
      closing: 'ARO is not trying to calculate your worth. It is trying to make a little more room for the life you mean to live.',
      createLink: 'Bring a small possibility forward',
      nodes: {
        wants: { label: 'I am reaching for', title: 'Wants', copy: 'The kinds of moments that would make life feel larger right now.', items: localizedSignals('en', 'wants') },
        brings: { label: 'I can bring', title: 'Contributions', copy: 'Things you can share without needing to turn yourself into a listing.', items: localizedSignals('en', 'brings') },
        context: { label: 'Life has room for', title: 'Context', copy: 'A gentle sketch of the conditions that help a good opportunity fit.', items: ['Slow Sunday mornings', 'Calgary neighbourhoods', 'Small groups, not crowds'] },
        boundaries: { label: 'I keep safe', title: 'Boundaries', copy: 'Personal limits stay part of the field. They are not a reason to be less visible as a person.', items: localizedSignals('en', 'boundaries') },
      },
    },
    express: {
      back: 'Back to Personal Field', eyebrow: 'Personal expression', title: 'Express your world.', intro: 'A small visual layer for the way you move through ARO—not a score, a shop, or a costume game.', localPreview: 'Local preview', currentExpression: 'Maya’s current expression', currentThread: 'The thread she brings', shelfGroup: 'Expression categories', optionGroup: (label) => `${label} choices`, choose: (label) => `Choose a ${label.toLowerCase()}`, chooserTitle: 'A visible way to say what kind of day this is.', currentPreview: 'Current preview', apply: 'Apply this preview', applied: 'Preview applied locally', idleStatus: 'This is an interactive visual preview only. Nothing is saved, bought, or shared.', appliedStatus: 'This view has updated for the current preview only. Nothing was saved.', personaAlt: 'Original fictional full-body illustration of Maya in relaxed creative clothing',
      shelves: {
        look: { label: 'Look', options: { 'field-notes': { label: 'Field notes', detail: 'Soft layers · ready to wander', note: 'Camera and notebook' }, 'table-maker': { label: 'Table maker', detail: 'Warm layers · ready to welcome', note: 'A long table and good questions' }, 'night-walker': { label: 'Evening walk', detail: 'Dark layers · ready to notice', note: 'City lights and an open hour' } } },
        carry: { label: 'Carry', options: { camera: { label: 'Camera', detail: 'A tool for noticing', note: 'You bring a way of seeing' }, notebook: { label: 'Notebook', detail: 'A place for loose ideas', note: 'You bring questions worth keeping' }, cup: { label: 'Coffee cup', detail: 'A reason to stay awhile', note: 'You bring an easy invitation' } } },
        atmosphere: { label: 'Atmosphere', options: { golden: { label: 'Golden hour', detail: 'Warm, open, unhurried', note: 'Your world feels a little more possible' }, river: { label: 'River blue', detail: 'Clear air and a long view', note: 'Your world has room to breathe' }, candlelight: { label: 'Candlelight', detail: 'A table after dark', note: 'Your world makes room for conversation' } } },
      },
      principles: [
        { title: 'Personal, not performative', copy: 'Expression gives your own journey texture. It is never a popularity signal.' },
        { title: 'Connected to real life', copy: 'The visual layer should point toward what you want to do, make, or notice offline.' },
        { title: 'Always in your control', copy: 'A real version would require explicit editing, privacy, and deletion controls first.' },
      ],
    },
  },
  fr: {
    profile: {
      eyebrow: 'Identité en mouvement', settingsLabel: 'Ouvrir les paramètres', fieldEyebrow: 'Votre champ personnel', fieldTitle: 'Les parts de vous qui rendent une prochaine chose possible.', previewLabel: 'Champ d’aperçu', portraitAlt: 'Portrait illustré de Maya à Calgary à l’heure dorée', portraitCaption: 'Maya · pas un score', instruction: 'Choisissez un signal pour voir un fil de la vie de Maya. Rien n’est enregistré ni partagé dans cet aperçu.', expressEyebrow: 'Une couche visuelle pour vous', expressTitle: 'Exprimez votre monde.', expressBody: 'Prévisualisez un personnage en pied, les petites choses que vous portez et l’atmosphère qui vous ressemble.', expressLink: 'Ouvrir l’aperçu d’expression', selectedEyebrow: 'Signal sélectionné', connectionNote: 'Dans un vrai parcours ARO, ce sont des connexions, pas des étiquettes. Elles aident à montrer ce qui pourrait prendre forme.', privacyEyebrow: 'Privé par conception', privacyTitle: 'Vous décidez de ce qui appartient au champ.', privacyBody: 'Ce prototype visuel utilise uniquement les données statiques fictives de Maya. Il n’a rien enregistré, associé ni partagé.', privacyButton: 'Comment cela deviendra réel plus tard', privacyDetail: 'P1 exigera un consentement explicite, un stockage réservé au propriétaire, ainsi que des contrôles de modification et de suppression avant qu’un signal personnel puisse influencer quoi que ce soit. Rien de cela n’existe encore ici.', closing: 'ARO ne cherche pas à calculer votre valeur. Il cherche à faire un peu plus de place à la vie que vous voulez vivre.', createLink: 'Faire avancer une petite possibilité',
      nodes: {
        wants: { label: 'Je tends vers', title: 'Envies', copy: 'Les moments qui pourraient rendre la vie plus vaste en ce moment.', items: localizedSignals('fr', 'wants') },
        brings: { label: 'Je peux apporter', title: 'Contributions', copy: 'Ce que vous pouvez partager sans devoir vous transformer en annonce.', items: localizedSignals('fr', 'brings') },
        context: { label: 'Ma vie a de la place pour', title: 'Contexte', copy: 'Une esquisse douce des conditions qui aident une bonne opportunité à convenir.', items: ['Dimanches matin tranquilles', 'Quartiers de Calgary', 'Petits groupes, pas de foule'] },
        boundaries: { label: 'Je protège', title: 'Limites', copy: 'Les limites personnelles restent dans le champ. Elles ne rendent pas une personne moins visible.', items: localizedSignals('fr', 'boundaries') },
      },
    },
    express: {
      back: 'Retour au Champ personnel', eyebrow: 'Expression personnelle', title: 'Exprimez votre monde.', intro: 'Une petite couche visuelle pour votre façon de traverser ARO — pas un score, une boutique ou un jeu de costumes.', localPreview: 'Aperçu local', currentExpression: 'Expression actuelle de Maya', currentThread: 'Le fil qu’elle apporte', shelfGroup: 'Catégories d’expression', optionGroup: (label) => `Choix ${label}`, choose: (label) => `Choisir : ${label.toLowerCase()}`, chooserTitle: 'Une façon visible de dire quel genre de journée vous vivez.', currentPreview: 'Aperçu actuel', apply: 'Appliquer cet aperçu', applied: 'Aperçu appliqué localement', idleStatus: 'Ceci est seulement un aperçu visuel interactif. Rien n’est enregistré, acheté ni partagé.', appliedStatus: 'Cette vue a changé uniquement pour l’aperçu actuel. Rien n’a été enregistré.', personaAlt: 'Illustration fictive originale en pied de Maya dans des vêtements créatifs et décontractés',
      shelves: {
        look: { label: 'Style', options: { 'field-notes': { label: 'Notes de terrain', detail: 'Couches douces · prête à explorer', note: 'Appareil photo et carnet' }, 'table-maker': { label: 'Hôte de table', detail: 'Couches chaudes · prête à accueillir', note: 'Une longue table et de bonnes questions' }, 'night-walker': { label: 'Marche du soir', detail: 'Couches sombres · prête à observer', note: 'Lumières de ville et une heure libre' } } },
        carry: { label: 'À emporter', options: { camera: { label: 'Appareil photo', detail: 'Un outil pour remarquer', note: 'Vous apportez une façon de voir' }, notebook: { label: 'Carnet', detail: 'Un endroit pour les idées libres', note: 'Vous apportez des questions à garder' }, cup: { label: 'Tasse de café', detail: 'Une raison de rester un peu', note: 'Vous apportez une invitation simple' } } },
        atmosphere: { label: 'Atmosphère', options: { golden: { label: 'Heure dorée', detail: 'Chaleureuse, ouverte, sans hâte', note: 'Votre monde semble un peu plus possible' }, river: { label: 'Bleu rivière', detail: 'Air clair et vue lointaine', note: 'Votre monde a de la place pour respirer' }, candlelight: { label: 'Lueur de bougie', detail: 'Une table après la nuit', note: 'Votre monde fait place à la conversation' } } },
      },
      principles: [
        { title: 'Personnel, pas performatif', copy: 'L’expression donne de la texture à votre parcours. Ce n’est jamais un signal de popularité.' },
        { title: 'Relié à la vraie vie', copy: 'La couche visuelle doit pointer vers ce que vous voulez faire, créer ou remarquer hors ligne.' },
        { title: 'Toujours sous votre contrôle', copy: 'Une vraie version exigerait d’abord des contrôles explicites de modification, confidentialité et suppression.' },
      ],
    },
  },
  es: {
    profile: {
      eyebrow: 'Identidad en movimiento', settingsLabel: 'Abrir ajustes', fieldEyebrow: 'Tu campo personal', fieldTitle: 'Las partes de ti que hacen posible lo que viene después.', previewLabel: 'Campo de vista previa', portraitAlt: 'Retrato ilustrado de Maya en Calgary durante la hora dorada', portraitCaption: 'Maya · no es una puntuación', instruction: 'Elige una señal para ver un hilo de la vida de Maya. Nada se guarda ni se comparte en esta vista previa.', expressEyebrow: 'Una capa visual para ti', expressTitle: 'Expresa tu mundo.', expressBody: 'Previsualiza una figura de cuerpo completo, las pequeñas cosas que llevas y la atmósfera que se siente como tú.', expressLink: 'Abrir vista previa de expresión', selectedEyebrow: 'Señal seleccionada', connectionNote: 'En un flujo real de ARO, son conexiones, no etiquetas. Ayudan a mostrar qué podría formarse después.', privacyEyebrow: 'Privado por diseño', privacyTitle: 'Tú decides qué pertenece al campo.', privacyBody: 'Este prototipo visual usa solo datos estáticos ficticios de Maya. No ha guardado, relacionado ni compartido nada.', privacyButton: 'Cómo se vuelve real más adelante', privacyDetail: 'P1 requerirá consentimiento explícito, almacenamiento solo del propietario y controles de edición y eliminación antes de que las señales personales puedan influir en algo. Nada de eso existe todavía aquí.', closing: 'ARO no intenta calcular tu valor. Intenta crear un poco más de espacio para la vida que quieres vivir.', createLink: 'Llevar una pequeña posibilidad adelante',
      nodes: {
        wants: { label: 'Estoy buscando', title: 'Deseos', copy: 'Los momentos que harían que la vida se sintiera más amplia ahora.', items: localizedSignals('es', 'wants') },
        brings: { label: 'Puedo aportar', title: 'Contribuciones', copy: 'Cosas que puedes compartir sin convertirte en un anuncio.', items: localizedSignals('es', 'brings') },
        context: { label: 'Mi vida tiene espacio para', title: 'Contexto', copy: 'Un boceto amable de las condiciones que ayudan a que una buena oportunidad encaje.', items: ['Domingos tranquilos por la mañana', 'Barrios de Calgary', 'Grupos pequeños, no multitudes'] },
        boundaries: { label: 'Mantengo seguro', title: 'Límites', copy: 'Los límites personales siguen siendo parte del campo. No hacen que una persona sea menos visible.', items: localizedSignals('es', 'boundaries') },
      },
    },
    express: {
      back: 'Volver al Campo personal', eyebrow: 'Expresión personal', title: 'Expresa tu mundo.', intro: 'Una pequeña capa visual para cómo te mueves por ARO: no una puntuación, una tienda ni un juego de disfraces.', localPreview: 'Vista previa local', currentExpression: 'Expresión actual de Maya', currentThread: 'El hilo que aporta', shelfGroup: 'Categorías de expresión', optionGroup: (label) => `Opciones de ${label}`, choose: (label) => `Elige: ${label.toLowerCase()}`, chooserTitle: 'Una forma visible de decir qué tipo de día es este.', currentPreview: 'Vista previa actual', apply: 'Aplicar esta vista previa', applied: 'Vista previa aplicada localmente', idleStatus: 'Esto es solo una vista previa visual interactiva. Nada se guarda, compra ni comparte.', appliedStatus: 'Esta vista cambió solo para la vista previa actual. Nada se guardó.', personaAlt: 'Ilustración ficticia original de cuerpo completo de Maya con ropa creativa y relajada',
      shelves: {
        look: { label: 'Estilo', options: { 'field-notes': { label: 'Notas de campo', detail: 'Capas suaves · lista para explorar', note: 'Cámara y libreta' }, 'table-maker': { label: 'Anfitriona de mesa', detail: 'Capas cálidas · lista para recibir', note: 'Una mesa larga y buenas preguntas' }, 'night-walker': { label: 'Paseo nocturno', detail: 'Capas oscuras · lista para observar', note: 'Luces de ciudad y una hora libre' } } },
        carry: { label: 'Llevar', options: { camera: { label: 'Cámara', detail: 'Una herramienta para observar', note: 'Aportas una forma de mirar' }, notebook: { label: 'Libreta', detail: 'Un lugar para ideas sueltas', note: 'Aportas preguntas que vale la pena guardar' }, cup: { label: 'Taza de café', detail: 'Una razón para quedarse un rato', note: 'Aportas una invitación fácil' } } },
        atmosphere: { label: 'Atmósfera', options: { golden: { label: 'Hora dorada', detail: 'Cálida, abierta, sin prisa', note: 'Tu mundo se siente un poco más posible' }, river: { label: 'Azul río', detail: 'Aire claro y una vista larga', note: 'Tu mundo tiene espacio para respirar' }, candlelight: { label: 'Luz de vela', detail: 'Una mesa después del anochecer', note: 'Tu mundo hace espacio para conversar' } } },
      },
      principles: [
        { title: 'Personal, no performativo', copy: 'La expresión da textura a tu propio recorrido. Nunca es una señal de popularidad.' },
        { title: 'Conectado con la vida real', copy: 'La capa visual debe apuntar a lo que quieres hacer, crear u observar fuera de la pantalla.' },
        { title: 'Siempre bajo tu control', copy: 'Una versión real requeriría primero controles explícitos de edición, privacidad y eliminación.' },
      ],
    },
  },
};

export const getFv1PersonalCopy = (language) => fv1PersonalCopy[language] ?? fv1PersonalCopy.en;
