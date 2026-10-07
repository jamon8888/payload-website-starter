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
        de: 'Einbettungs-URL',
        fr: 'URL d\'intégration',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: {
        en: 'Frame Title',
        de: 'Frame-Titel',
        fr: 'Titre du cadre',
      },
      admin: {
        description: {
          en: 'Describes the function of the frame, e.g. "Map of Paris office location"',
          de: 'Beschreibt die Funktion des Frames, z. B. "Karte des Standorts des Büros in Paris"',
          fr: 'Décrit la fonction du cadre, ex: "Carte de localisation du bureau de Paris"',
        },
      },
    },
  ],
}