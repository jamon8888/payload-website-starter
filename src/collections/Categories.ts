import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: {
      en: 'Category',
      es: 'Categoría',
      fr: 'Catégorie',
    },
    plural: {
      en: 'Categories',
      es: 'Categorías',
      fr: 'Catégories',
    },
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: {
        en: 'Title',
        es: 'Título',
        fr: 'Titre',
      },
    },
    slugField({
      position: undefined,
    }),
  ],
}
