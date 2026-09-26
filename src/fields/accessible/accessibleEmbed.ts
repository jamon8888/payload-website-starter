import type { Field } from 'payload'

export interface AccessibleEmbed {
  src: string
  title: string
}

export const accessibleEmbed: Field = {
  name: 'embed',
  type: 'group',
  localized: true,
  fields: [
    {
      name: 'src',
      type: 'text',
      required: true,
      label: {
        en: 'Embed URL',
        fr: 'URL d\'intégration',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: {
        en: 'Frame Title',
        fr: 'Titre du cadre',
      },
      admin: {
        description: {
          en: 'Describes the function of the frame, e.g. "Map of Paris office location"',
          fr: 'Décrit la fonction du cadre, ex: "Carte de localisation du bureau de Paris"',
        },
      },
    },
  ],
}