import type { Field } from 'payload'

export interface AEOSummary {
  aeoSummary: string
}

export interface AnswerBlock {
  question: string
  answer: string
  sourceLink?: string
}

export interface AEOFields {
  aeoSummary: string
  answerBlocks: AnswerBlock[]
}

export const aeoSummaryField: Field = {
  name: 'aeoSummary',
  type: 'textarea',
  localized: true,
  required: true,
  maxLength: 250,
  label: {
    en: 'AEO Summary (≤250 chars, for AI answers)',
    de: 'AEO-Zusammenfassung (≤250 Zeichen, für KI-Antworten)',
    es: 'Resumen AEO (≤250 car., para respuestas IA)',
    fr: 'Résumé AEO (≤250 car., pour réponses IA)',
  },
  admin: {
    description: {
      en: 'Concise summary used for llms.txt, SpeakableSpecification, and AI citations. Must be self-contained.',
      de: 'Kurze Zusammenfassung für llms.txt, SpeakableSpecification und KI-Zitate. Muss in sich geschlossen sein.',
      fr: 'Résumé concis utilisé pour llms.txt, SpeakableSpecification et citations IA. Doit être autonome.',
    },
  },
}

export const answerBlocksField: Field = {
  name: 'answerBlocks',
  type: 'array',
  localized: true,
  label: {
    en: 'Answer Blocks (Passage-level Q&A for AI)',
    de: 'Antwortblöcke (Abschnittsweise Fragen und Antworten für KI)',
    es: 'Bloques de respuesta (Preguntas y respuestas a nivel de pasaje para IA)',
    fr: 'Blocs de réponse (Q/R au niveau passage pour IA)',
  },
  admin: {
    description: {
      en: 'Each block is a standalone Q&A pair that AI engines can cite directly.',
      de: 'Jeder Block ist ein eigenständiges Fragen-Antwort-Paar, das KI-Systeme direkt zitieren können.',
      fr: 'Chaque bloc est une paire Q/R autonome que les moteurs IA peuvent citer directement.',
    },
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      label: {
        en: 'Question (natural user query)',
        de: 'Frage (natürliche Nutzeranfrage)',
        es: 'Pregunta (consulta natural del usuario)',
        fr: 'Question (requête utilisateur naturelle)',
      },
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
      maxLength: 300,
      label: {
        en: 'Answer (self-contained, ≤300 chars)',
        de: 'Antwort (in sich geschlossen, ≤300 Zeichen)',
        es: 'Respuesta (autónoma, ≤300 car.)',
        fr: 'Réponse (autonome, ≤300 car.)',
      },
    },
    {
      name: 'sourceLink',
      type: 'text',
      label: {
        en: 'Source Link (optional)',
        de: 'Quellenlink (optional)',
        es: 'Enlace de origen (opcional)',
        fr: 'Lien source (optionnel)',
      },
    },
  ],
}