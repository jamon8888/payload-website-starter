import type { Block } from 'payload'

export const Accordion: Block = {
  slug: 'accordion',
  interfaceName: 'AccordionBlock',
  labels: {
    singular: { en: 'Accordion', de: 'Akkordeon', es: 'Acordeón', fr: 'Accordéon' },
    plural: { en: 'Accordions', de: 'Akkordeons', es: 'Acordeones', fr: 'Accordéons' },
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
      label: {
        en: 'Items',
        de: 'Elemente',
        es: 'Elementos',
        fr: 'Éléments',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
          label: { en: 'Title', de: 'Titel', es: 'Título', fr: 'Titre' },
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
