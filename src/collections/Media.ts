import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: {
      en: 'Media',
      es: 'Medio',
      fr: 'Média',
    },
    plural: {
      en: 'Media',
      es: 'Medios',
      fr: 'Médias',
    },
  },
  folders: true,
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'role',
      type: 'radio',
      required: true,
      defaultValue: 'informative',
      options: [
        { label: 'Informative', value: 'informative' },
        { label: 'Decorative', value: 'decorative' },
      ],
      label: {
        en: 'Image Role',
        es: 'Rol de la imagen',
        fr: 'Rôle de l\'image',
      },
      admin: {
        description: {
          en: 'Informative images require alt text. Decorative images are ignored by screen readers.',
          fr: 'Les images informatives nécessitent un texte alternatif. Les images décoratives sont ignorées par les lecteurs d\'écran.',
        },
      },
    },
    {
      name: 'alt',
      type: 'text',
      localized: true,
      admin: {
        condition: (_, siblingData) => siblingData?.role === 'informative',
        description: {
          en: 'Required for informative images. Leave empty for decorative images.',
          fr: 'Requis pour les images informatives. Laisser vide pour les images décoratives.',
        },
      },
      validate: (value: unknown, { siblingData }: { siblingData?: { role?: string } }) => {
        const altValue = Array.isArray(value) ? value[0] : value
        if (siblingData?.role === 'informative' && !altValue) {
          return 'Alt text is required for informative images.'
        }
        if (siblingData?.role === 'decorative' && altValue) {
          return 'Decorative images must not have alt text (leave empty).'
        }
        return true
      },
      label: {
        en: 'Alt Text',
        es: 'Texto alternativo',
        fr: 'Texte alternatif',
      },
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      localized: true,
      label: {
        en: 'Caption',
        es: 'Pie de foto',
        fr: 'Légende',
      },
    },
  ],
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    staticDir: path.resolve(dirname, '../../public/media'),
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
}
