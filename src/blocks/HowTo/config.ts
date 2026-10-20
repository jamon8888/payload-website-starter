import type { Block } from 'payload'

export const HowTo: Block = {
  slug: 'howTo',
  interfaceName: 'HowToBlock',
  labels: {
    singular: { en: 'How-to', de: 'Anleitung', es: 'Cómo hacerlo', fr: 'Mode d’emploi' },
    plural: { en: 'How-tos', de: 'Anleitungen', es: 'Cómo hacerlo', fr: 'Modes d’emploi' },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      localized: true,
      required: true,
      label: { en: 'Title', de: 'Titel', es: 'Título', fr: 'Titre' },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: { en: 'Description', de: 'Beschreibung', es: 'Descripción', fr: 'Description' },
    },
    {
      name: 'steps',
      type: 'array',
      required: true,
      label: { en: 'Steps', de: 'Schritte', es: 'Pasos', fr: 'Étapes' },
      fields: [
        {
          name: 'name',
          type: 'text',
          localized: true,
          required: true,
          label: { en: 'Step title', de: 'Schritt-Titel', es: 'Título del paso', fr: 'Titre de l’étape' },
        },
        {
          name: 'text',
          type: 'textarea',
          localized: true,
          required: true,
          label: { en: 'Step description', de: 'Schrittbeschreibung', es: 'Descripción del paso', fr: 'Description de l’étape' },
        },
        {
          name: 'url',
          type: 'text',
          label: { en: 'Link', de: 'Link', es: 'Enlace', fr: 'Lien' },
        },
      ],
    },
    {
      name: 'totalTime',
      type: 'text',
      label: {
        en: 'Total duration (ISO 8601)',
        de: 'Gesamtdauer (ISO 8601)',
        es: 'Duración total (ISO 8601)',
        fr: 'Durée totale (ISO 8601)',
      },
      admin: {
        description: {
          en: 'ISO 8601 duration, e.g. PT30M for 30 minutes.',
          de: 'ISO-8601-Dauer, z. B. PT30M für 30 Minuten.',
          es: 'Duración ISO 8601, p. ej. PT30M para 30 minutos.',
          fr: 'Durée ISO 8601, par ex. PT30M pour 30 minutes.',
        },
      },
    },
    {
      name: 'estimatedCost',
      type: 'group',
      label: { en: 'Estimated cost', de: 'Geschätzte Kosten', es: 'Coste estimado', fr: 'Coût estimé' },
      fields: [
        {
          name: 'currency',
          type: 'text',
          label: { en: 'Currency', de: 'Währung', es: 'Moneda', fr: 'Devise' },
        },
        {
          name: 'value',
          type: 'number',
          label: { en: 'Value', de: 'Wert', es: 'Valor', fr: 'Valeur' },
        },
      ],
    },
    {
      name: 'supply',
      type: 'array',
      label: { en: 'Supplies', de: 'Material', es: 'Materiales', fr: 'Fournitures' },
      fields: [
        {
          name: 'name',
          type: 'text',
          localized: true,
          label: { en: 'Name', de: 'Name', es: 'Nombre', fr: 'Nom' },
        },
      ],
    },
    {
      name: 'tool',
      type: 'array',
      label: { en: 'Tools', de: 'Werkzeuge', es: 'Herramientas', fr: 'Outils' },
      fields: [
        {
          name: 'name',
          type: 'text',
          localized: true,
          label: { en: 'Name', de: 'Name', es: 'Nombre', fr: 'Nom' },
        },
      ],
    },
  ],
}
