import type { Block } from 'payload'

export const ModalBlock: Block = {
  slug: 'modal',
  interfaceName: 'ModalBlock',
  labels: {
    singular: { en: 'Modal', de: 'Modal', es: 'Modal', fr: 'Modale' },
    plural: { en: 'Modals', de: 'Modals', es: 'Modales', fr: 'Modales' },
  },
  fields: [
    {
      name: 'triggerLabel',
      type: 'text',
      localized: true,
      required: true,
      label: { en: 'Button label', de: 'Beschriftung', es: 'Etiqueta', fr: 'Libellé du bouton' },
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      label: { en: 'Title', de: 'Titel', es: 'Título', fr: 'Titre' },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: { en: 'Description', de: 'Beschreibung', es: 'Descripción', fr: 'Description' },
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
      label: { en: 'Content', de: 'Inhalt', es: 'Contenido', fr: 'Contenu' },
    },
  ],
}
