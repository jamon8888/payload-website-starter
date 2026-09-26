import type { Field } from 'payload'

export interface AccessibleImage {
  asset: string | number | { url: string; alt?: string; filename?: string }
  role: 'informative' | 'decorative'
  alt?: string
}

export const accessibleImage: Field = {
  name: 'image',
  type: 'group',
  localized: true,
  fields: [
    {
      name: 'asset',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'role',
      type: 'radio',
      required: true,
      defaultValue: 'informative',
      options: [
        { label: 'Porteuse d\'information', value: 'informative' },
        { label: 'Décorative', value: 'decorative' },
      ],
    },
    {
      name: 'alt',
      type: 'text',
      localized: true,
      admin: {
        condition: (_, siblingData: { role?: string }) => siblingData?.role === 'informative',
        description: {
          en: 'Required for informative images. Leave empty for decorative images.',
          fr: 'Requis pour les images informatives. Laisser vide pour les images décoratives.',
        },
      },
      validate: (value: unknown, { siblingData }: { siblingData: { role?: string } }) => {
        if (siblingData?.role === 'informative' && !value) {
          return 'Texte alternatif requis pour une image informative.'
        }
        if (siblingData?.role === 'decorative' && value) {
          return 'Les images décoratives ne doivent pas avoir de texte alternatif (laisser vide).'
        }
        return true
      },
    },
  ],
}