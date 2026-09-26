import type { Field, GroupField } from 'payload'

import deepMerge from '@/utilities/deepMerge'

const GENERIC_LINK_LABELS = [
  'cliquez ici',
  'en savoir plus',
  'lire la suite',
  'ici',
  'click here',
  'read more',
  'learn more',
  'here',
]

export type LinkAppearances = 'default' | 'outline'

export const appearanceOptions: Record<LinkAppearances, { label: string; value: string }> = {
  default: {
    label: 'Default',
    value: 'default',
  },
  outline: {
    label: 'Outline',
    value: 'outline',
  },
}

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false
  disableLabel?: boolean
  overrides?: Partial<GroupField>
}) => GroupField

export const link: LinkType = ({ appearances, disableLabel = false, overrides = {} } = {}) => {
  const linkResult: GroupField = {
    name: 'link',
    type: 'group',
    admin: {
      hideGutter: true,
    },
    hooks: {
      beforeValidate: [
        ({ data }) => {
          const label = data?.label
          if (label) {
            const normalized = label.trim().toLowerCase()
            if (GENERIC_LINK_LABELS.includes(normalized)) {
              throw new Error(
                'Intitulé de lien non explicite hors contexte — RGAA 6.1/6.2'
              )
            }
          }
          return data
        },
      ],
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            defaultValue: 'reference',
            options: [
              {
                label: {
                  en: 'Internal link',
                  es: 'Enlace interno',
                  fr: 'Lien interne',
                },
                value: 'reference',
              },
              {
                label: {
                  en: 'Custom URL',
                  es: 'URL personalizada',
                  fr: 'URL personnalisée',
                },
                value: 'custom',
              },
            ],
          },
          {
            name: 'newTab',
            type: 'checkbox',
            admin: {
              style: {
                alignSelf: 'flex-end',
              },
              width: '50%',
            },
            label: {
              en: 'Open in new tab',
              es: 'Abrir en nueva pestaña',
              fr: 'Ouvrir dans un nouvel onglet',
            },
          },
        ],
      },
    ],
  }

  const linkTypes: Field[] = [
    {
      name: 'reference',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
      label: {
        en: 'Document to link to',
        es: 'Documento para enlazar',
        fr: 'Document à lier',
      },
      relationTo: ['pages', 'posts'],
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
      label: {
        en: 'Custom URL',
        es: 'URL personalizada',
        fr: 'URL personnalisée',
      },
      required: true,
    },
  ]

  if (!disableLabel) {
    linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: '50%',
      },
    }))

    linkResult.fields.push({
      type: 'row',
      fields: [
        ...linkTypes,
        {
          name: 'label',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: {
            en: 'Label',
            es: 'Etiqueta',
            fr: 'Libellé',
          },
          required: true,
        },
      ],
    })
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes]
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = [appearanceOptions.default, appearanceOptions.outline]

    if (appearances) {
      appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance])
    }

    linkResult.fields.push({
      name: 'appearance',
      type: 'select',
      admin: {
        description: {
          en: 'Choose how the link should be rendered.',
          es: 'Elige cómo se debe renderizar el enlace.',
          fr: 'Choisissez comment le lien doit être rendu.',
        },
      },
      defaultValue: 'default',
      options: appearanceOptionsToUse,
    })
  }

  return deepMerge(linkResult, overrides)
}
