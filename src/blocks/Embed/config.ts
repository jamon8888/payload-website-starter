import type { Block } from 'payload'

export const Embed: Block = {
  slug: 'embed',
  interfaceName: 'EmbedBlock',
  labels: {
    singular: { en: 'Embed', de: 'Einbettung', es: 'Incruste', fr: 'Intégration' },
    plural: { en: 'Embeds', de: 'Einbettungen', es: 'Incrustes', fr: 'Intégrations' },
  },
  fields: [
    {
      name: 'url',
      type: 'text',
      required: true,
      label: {
        en: 'URL',
        de: 'URL',
        es: 'URL',
        fr: 'URL',
      },
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
      label: {
        en: 'Title',
        de: 'Titel',
        es: 'Título',
        fr: 'Titre',
      },
      admin: {
        description: {
          en: 'Accessible name of the frame. Describe what the embedded content shows.',
          de: 'Zugänglicher Name des Frames. Beschreiben Sie, was der eingebettete Inhalt zeigt.',
          es: 'Nombre accesible del marco. Describa qué muestra el contenido incrustado.',
          fr: "Nom accessible du cadre. Décrivez ce que montre le contenu intégré.",
        },
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: {
        en: 'Description',
        de: 'Beschreibung',
        es: 'Descripción',
        fr: 'Description',
      },
      admin: {
        description: {
          en: 'Displayed below the frame, as a text alternative to the embedded content.',
          de: 'Wird unter dem Frame angezeigt, als Textalternative zum eingebetteten Inhalt.',
          es: 'Se muestra bajo el marco, como alternativa textual al contenido incrustado.',
          fr: "Affichée sous le cadre, comme alternative textuelle au contenu intégré.",
        },
      },
    },
  ],
}
