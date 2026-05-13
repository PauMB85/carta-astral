import type { Lang } from "@shared/domain/lang";

export type Dictionary = (typeof DICTIONARIES)[Lang];

export function getDictionary(lang: Lang): Dictionary {
  return DICTIONARIES[lang];
}

const DICTIONARIES = {
  es: {
    nav: {
      brand: "GALGO ASTRAL",
      brandSub: "est. en la luna nueva",
      links: [{ label: "CARTA ASTRAL", href: "#form" }],
    },
    hero: {
      eyebrow: "CARTA ASTRAL",
      title1: "El cosmos",
      title2: "guarda secretos",
      title3: "sobre quien eres",
      body: "Descubre tu alma estelar. Una carta astral trazada a mano por astrólogas iniciadas en el linaje del galgo de la luna. Después, podrás consultar también el lazo con tu mascota.",
      cta: "CONSULTAR MI CARTA",
      sub: "Trazada a mano. Entrega en 24 horas. Siete generaciones de tradición.",
    },
    pillars: [
      {
        roman: "I",
        title: "El Sol revela",
        body: "La esencia de tu carácter, lo que ilumina tu existencia.",
      },
      {
        roman: "II",
        title: "La Luna susurra",
        body: "Tus emociones más íntimas, miedos y deseos ocultos.",
      },
      {
        roman: "III",
        title: "El lazo aparece",
        body: "Después podrás consultar tu lazo con tu mascota.",
      },
    ],
    form: {
      eyebrow: "RITUAL DE CONSULTA",
      title: "Convoca tu carta",
      sub: "Los astros responden a quien pregunta con precisión",
      name: "Tu nombre completo",
      namePlaceholder: "Orión, Luna, Selene…",
      date: "Fecha de nacimiento",
      time: "Hora de nacimiento",
      timeHint: "(si la conoces — la luna ascendente lo agradece)",
      place: "Lugar de nacimiento",
      placePlaceholder: "Isla Negra, Chile",
      purpose: "¿Sobre qué deseas saber?",
      love: "Amor & vínculos",
      loveSub: "Venus & la Luna",
      life: "Vida & destino",
      lifeSub: "el Sol & los nodos",
      submit: "Trazar mi carta astral",
      submitting: "Trazando tu carta astral…",
      sealed: "Sellado con cera de luna",
    },
    reading: {
      titlePrefix: "Para",
      titleFallback: "Tu carta astral",
      eyebrow: "LECTURA SELLADA",
      sectionsLabel: "EL CIELO REVELA",
      tipsLabel: "RITUAL RECOMENDADO",
      newConsult: "Consultar otra alma",
      consulting: "Consultando…",
      streaming: "Las estrellas se alinean",
      streamingSub: "tu lectura está naciendo…",
      errorEyebrow: "LAS ESTRELLAS SUSURRAN",
      errorMessage:
        "Las estrellas están veladas esta noche. Intenta de nuevo en un momento.",
      missingDataEyebrow: "LAS ESTRELLAS PIDEN MÁS DETALLES",
      missingDataTitle: "Necesitamos un poco más",
      missingDataFallback:
        "Necesitamos algún dato más para una lectura precisa.",
      genericErrorFallback: "Algo se interpuso entre tú y los astros.",
      rateLimitEyebrow: "EL COSMOS PIDE PAUSA",
      rateLimitMessage:
        "Las estrellas están saturadas en este momento. El cosmos pide unos minutos antes de revelar otra carta.",
    },
    footer: {
      quote:
        "« Quien observa el cielo de su mascota, observa el suyo propio. »",
      credits: "GALGO ASTRAL · MMXXVI · SUB LUNA NOVA",
    },
    pet: {
      prelude: {
        eyebrow: "FIN DE TU CARTA ASTRAL",
        quote:
          "« Has visto la luz que el cielo te entregó al nacer. Pero hay un capítulo más, sólo para quienes comparten su vida con un animal. »",
      },
      premium: {
        eyebrow: "LECTURA PREMIUM",
        title: "Descubre tu vínculo astral con tu mascota",
        sub: "Tu carta también habla de cómo amas y conectas. Ahora puedes descubrir una lectura simbólica sobre tu vínculo con tu perro o gato.",
        priceLabel: "LECTURA PREMIUM",
        priceAmount: "2,99 €",
        cta: "VER COMPATIBILIDAD CON MI MASCOTA",
      },
      form: {
        eyebrow: "LECTURA PREMIUM · PASO I DE II",
        title: "Cuéntame sobre tu mascota",
        sub: "Los astros necesitan conocerla para trazar su vínculo contigo.",
        sectionName: "NOMBRE DE TU MASCOTA",
        sectionType: "¿PERRO O GATO?",
        sectionDates: "FECHAS",
        sectionGender: "GÉNERO",
        sectionPersonality: "PERSONALIDAD",
        sectionFocus: "¿QUÉ QUIERES EXPLORAR?",
        namePlaceholder: "Luna, Orión, Mochi…",
        birthDateLabel: "FECHA DE NACIMIENTO",
        adoptionDateLabel: "FECHA DE ADOPCIÓN",
        datesMicrocopy:
          "Si no conoces su fecha de nacimiento, usa la fecha en que llegó a tu vida.",
        datesError:
          "Necesitamos al menos una fecha — la del nacimiento o la del día que llegó a tu vida. Los astros no pueden trazar un mapa sin un punto de partida.",
        personalityHint: "elige hasta 5",
        personalityCounter: "{n} / 5 SELECCIONADAS",
        submit: "CONTINUAR AL PAGO · 2,99 €",
        submitting: "Preparando el pago…",
        errorMissing:
          "Faltan datos. Asegúrate de elegir tipo, foco y al menos una fecha.",
        errorNetwork:
          "Algo se interpuso entre tú y los astros. Inténtalo de nuevo en un momento.",
        errorRateLimit:
          "Las estrellas están saturadas. El cosmos pide unos minutos antes de procesar otra petición.",
      },
      petType: { dog: "Perro", cat: "Gato" },
      petTypeSubtitle: { dog: "CANIS", cat: "FELIS" },
      petGender: { male: "Macho", female: "Hembra", unknown: "No sé" },
      personality: {
        playful: "Juguetón",
        calm: "Tranquilo",
        protective: "Protector",
        independent: "Independiente",
        affectionate: "Cariñoso",
        fearful: "Miedoso",
        curious: "Curioso",
        social: "Sociable",
        territorial: "Territorial",
        sensitive: "Sensible",
        mischievous: "Travieso",
        attached: "Apegado",
      },
      focus: {
        bond: "El vínculo entre nosotros",
        behavior: "Su comportamiento",
        emotional_support: "Su apoyo emocional",
        daily_life: "Nuestra vida cotidiana",
      },
      focusRoman: {
        bond: "I",
        behavior: "II",
        emotional_support: "III",
        daily_life: "IV",
      },
      noChart: {
        title: "Los astros no tienen datos tuyos aún",
        text: "Para descubrir tu vínculo astral con tu mascota, primero necesitas crear tu carta astral.",
        cta: "CREAR MI CARTA ASTRAL",
      },
      loading: {
        title: "Preparando tu lectura astral",
        sub: "EN UNOS INSTANTES TE LLEVAREMOS AL PAGO SEGURO",
      },
      success: {
        eyebrow: "COMPATIBILIDAD ASTRAL",
        waitingPayment: "Verificando tu pago…",
        highlightsLabel: "MOMENTOS CLAVE DEL VÍNCULO",
        sectionsLabel: "LO QUE EL CIELO DICE DE USTEDES",
        tipsLabel: "PARA LOS PRÓXIMOS 30 DÍAS",
        ritualEyebrow: "RITUAL PARA AMBOS",
        share: "COMPARTIR MI LECTURA",
        disclaimer:
          "Galgo Astral · Esta lectura es una interpretación simbólica realizada a partir de la fecha proporcionada. No sustituye la valoración de un veterinario ni de un profesional de la conducta animal. Trazada a mano por nuestras astrólogas en Isla Negra.",
        paymentRequiredTitle: "No vemos el pago todavía",
        paymentRequiredText:
          "Si acabas de pagar, en unos segundos lo confirmamos. Si no, vuelve a intentarlo desde el formulario.",
        sessionMissingTitle: "No encontramos tu sesión",
        sessionMissingText:
          "El enlace parece haber expirado o pertenecer a otra mascota. Vuelve a empezar desde tu carta natal.",
        backToForm: "VOLVER AL FORMULARIO",
        backToHome: "VOLVER AL INICIO",
        streamingTitle: "Trazando vuestro vínculo",
        streamingSub: "los astros están alineando vuestra historia…",
      },
    },
  },
  en: {
    nav: {
      brand: "GALGO ASTRAL",
      brandSub: "est. on the new moon",
      links: [{ label: "ASTRAL CHART", href: "#form" }],
    },
    hero: {
      eyebrow: "ASTRAL CHART",
      title1: "The cosmos",
      title2: "keeps secrets",
      title3: "about who you are",
      body: "Uncover your starlit soul. An astral chart drawn by hand by astrologers initiated in the lineage of the moon greyhound. After, you may also consult your bond with your pet.",
      cta: "CONSULT MY CHART",
      sub: "Hand drawn. 24h delivery. Seven generations of tradition.",
    },
    pillars: [
      {
        roman: "I",
        title: "The Sun reveals",
        body: "The essence of your character, what illuminates you.",
      },
      {
        roman: "II",
        title: "The Moon whispers",
        body: "Your innermost emotions, hidden fears and desires.",
      },
      {
        roman: "III",
        title: "The bond appears",
        body: "After, you may consult your bond with your pet.",
      },
    ],
    form: {
      eyebrow: "RITUAL OF CONSULTATION",
      title: "Summon your chart",
      sub: "The stars answer those who ask with precision",
      name: "Your full name",
      namePlaceholder: "Orion, Luna, Selene…",
      date: "Date of birth",
      time: "Time of birth",
      timeHint: "(if known — the rising moon will thank you)",
      place: "Place of birth",
      placePlaceholder: "Isla Negra, Chile",
      purpose: "What do you wish to know?",
      love: "Love & bonds",
      loveSub: "Venus & the Moon",
      life: "Life & destiny",
      lifeSub: "the Sun & the nodes",
      submit: "Trace my astral chart",
      submitting: "Tracing your chart…",
      sealed: "Sealed with moon wax.",
    },
    reading: {
      titlePrefix: "For",
      titleFallback: "Your astral chart",
      eyebrow: "SEALED READING",
      sectionsLabel: "THE SKY REVEALS",
      tipsLabel: "RECOMMENDED RITUAL",
      newConsult: "Consult another soul",
      consulting: "Consulting…",
      streaming: "The stars align",
      streamingSub: "your reading is being born…",
      errorEyebrow: "THE STARS WHISPER",
      errorMessage:
        "The stars are veiled tonight. Please try again in a moment.",
      missingDataEyebrow: "THE STARS REQUEST MORE DETAILS",
      missingDataTitle: "We need a little more",
      missingDataFallback:
        "We need a little more information for a precise reading.",
      genericErrorFallback: "Something stood between you and the stars.",
      rateLimitEyebrow: "THE COSMOS ASKS FOR PAUSE",
      rateLimitMessage:
        "The stars are overwhelmed right now. The cosmos asks for a few minutes before revealing another chart.",
    },
    footer: {
      quote:
        "« To observe your pet's sky is to observe your own. »",
      credits: "GALGO ASTRAL · MMXXVI · SUB LUNA NOVA",
    },
    pet: {
      prelude: {
        eyebrow: "END OF YOUR NATAL CHART",
        quote:
          "« You have seen the light the sky offered you at birth. But one more chapter remains, only for those who share their life with an animal. »",
      },
      premium: {
        eyebrow: "PREMIUM READING",
        title: "Discover your astral bond with your pet",
        sub: "Your chart also speaks of how you love and connect. Now you can uncover a symbolic reading of your bond with your dog or cat.",
        priceLabel: "PREMIUM READING",
        priceAmount: "2,99 €",
        cta: "VIEW COMPATIBILITY WITH MY PET",
      },
      form: {
        eyebrow: "PREMIUM READING · STEP I OF II",
        title: "Tell me about your pet",
        sub: "The stars need to know them to trace your bond.",
        sectionName: "YOUR PET'S NAME",
        sectionType: "DOG OR CAT?",
        sectionDates: "DATES",
        sectionGender: "GENDER",
        sectionPersonality: "PERSONALITY",
        sectionFocus: "WHAT DO YOU WISH TO EXPLORE?",
        namePlaceholder: "Luna, Orion, Mochi…",
        birthDateLabel: "DATE OF BIRTH",
        adoptionDateLabel: "DATE OF ADOPTION",
        datesMicrocopy:
          "If you don't know their date of birth, use the date they entered your life.",
        datesError:
          "We need at least one date — the day of their birth or the day they entered your life. The stars cannot trace a map without a starting point.",
        personalityHint: "choose up to 5",
        personalityCounter: "{n} / 5 SELECTED",
        submit: "CONTINUE TO PAYMENT · 2,99 €",
        submitting: "Preparing payment…",
        errorMissing:
          "Some details are missing. Make sure you choose pet type, focus, and at least one date.",
        errorNetwork:
          "Something stood between you and the stars. Please try again in a moment.",
        errorRateLimit:
          "The stars are overwhelmed. The cosmos asks for a few minutes before another request.",
      },
      petType: { dog: "Dog", cat: "Cat" },
      petTypeSubtitle: { dog: "CANIS", cat: "FELIS" },
      petGender: { male: "Male", female: "Female", unknown: "I don't know" },
      personality: {
        playful: "Playful",
        calm: "Calm",
        protective: "Protective",
        independent: "Independent",
        affectionate: "Affectionate",
        fearful: "Fearful",
        curious: "Curious",
        social: "Social",
        territorial: "Territorial",
        sensitive: "Sensitive",
        mischievous: "Mischievous",
        attached: "Attached",
      },
      focus: {
        bond: "The bond between us",
        behavior: "Their behaviour",
        emotional_support: "Their emotional support",
        daily_life: "Our daily life together",
      },
      focusRoman: {
        bond: "I",
        behavior: "II",
        emotional_support: "III",
        daily_life: "IV",
      },
      noChart: {
        title: "The stars don't have your data yet",
        text: "To discover your astral bond with your pet, you first need to create your natal chart.",
        cta: "CREATE MY NATAL CHART",
      },
      loading: {
        title: "Preparing your astral reading",
        sub: "IN A MOMENT WE'LL TAKE YOU TO SECURE PAYMENT",
      },
      success: {
        eyebrow: "ASTRAL COMPATIBILITY",
        waitingPayment: "Verifying your payment…",
        highlightsLabel: "KEY MOMENTS OF YOUR BOND",
        sectionsLabel: "WHAT THE SKY SAYS ABOUT YOU TWO",
        tipsLabel: "FOR THE NEXT 30 DAYS",
        ritualEyebrow: "A RITUAL FOR BOTH",
        share: "SHARE MY READING",
        disclaimer:
          "Galgo Astral · This reading is a symbolic interpretation based on the date provided. It does not replace the assessment of a veterinarian nor of an animal behaviour specialist. Hand-drawn by our astrologers on Isla Negra.",
        paymentRequiredTitle: "We don't see your payment yet",
        paymentRequiredText:
          "If you just paid, we'll confirm it in a few seconds. If not, please try again from the form.",
        sessionMissingTitle: "We can't find your session",
        sessionMissingText:
          "The link seems to have expired or belong to another pet. Start again from your natal chart.",
        backToForm: "BACK TO THE FORM",
        backToHome: "BACK TO HOME",
        streamingTitle: "Tracing your bond",
        streamingSub: "the stars are aligning your story…",
      },
    },
  },
} as const;
