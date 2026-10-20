import type { Block } from 'payload'

export const Tabs: Block = {
  slug: 'tabs',
  interfaceName: 'TabsBlock',
  labels: {
    singular: { en: 'Tabs', de: 'Tabs', es: 'Pestañas', fr: 'Onglets' },
    plural: { en: 'Tabs', de: 'Tabs', es: 'Pestañas', fr: 'Onglets' },
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
      label: {
        en: 'Tabs',
        de: 'Tabs',
        es: 'Pestañas',
        fr: 'Onglets',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          required: true,
          label: { en: 'Tab label', de: 'Tab-Bezeichnung', es: 'Etiqueta', fr: 'Libellé' },
        },
        {
          name: 'content',
          type: 'richText',
          localized: true,
          label: { en: 'Content', de: 'Inhalt', es: 'Contenido', fr: 'Contenu' },
        },
      ],
    },
  ],
}
