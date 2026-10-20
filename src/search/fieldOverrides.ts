import { Field } from 'payload'

export const searchFields: Field[] = [
  {
    name: 'slug',
    type: 'text',
    index: true,
    admin: {
      readOnly: true,
    },
  },
  {
    name: 'meta',
    label: 'Meta',
    type: 'group',
    index: true,
    admin: {
      readOnly: true,
    },
    fields: [
      {
        type: 'text',
        name: 'title',
        label: 'Title',
        // Localized like the source `meta` fields, so each locale of a post is
        // indexed and searched in its own language.
        localized: true,
      },
      {
        type: 'text',
        name: 'description',
        label: 'Description',
        localized: true,
      },
      {
        name: 'image',
        label: 'Image',
        type: 'upload',
        relationTo: 'media',
        localized: true,
      },
    ],
  },
  {
    label: 'Categories',
    name: 'categories',
    type: 'array',
    admin: {
      readOnly: true,
    },
    fields: [
      {
        name: 'relationTo',
        type: 'text',
      },
      {
        name: 'categoryID',
        type: 'text',
      },
      {
        name: 'title',
        type: 'text',
      },
    ],
  },
]
