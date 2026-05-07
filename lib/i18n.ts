import type { Lang } from "@/lib/types";

export type Dictionary = (typeof DICTIONARIES)[Lang];

export function pickLang(raw: string | undefined): Lang {
  return raw === "en" ? "en" : "es";
}

export function getDictionary(lang: Lang): Dictionary {
  return DICTIONARIES[lang];
}

const DICTIONARIES = {
  es: {
    nav: {
      brand: "GALGO ASTRAL",
      brandSub: "est. en la luna nueva",
      links: ["CARTA ASTRAL", "TAROT DIARIO", "EL LINAJE", "DIARIO"],
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
  },
  en: {
    nav: {
      brand: "GALGO ASTRAL",
      brandSub: "est. on the new moon",
      links: ["ASTRAL CHART", "DAILY TAROT", "THE LINEAGE", "JOURNAL"],
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
  },
} as const;
