import type { Field, GroupField } from 'payload'

import deepMerge from '@/utilities/deepMerge'

/**
 * Link labels that carry no meaning outside their surrounding sentence.
 * RGAA 6.1/6.2 requires links to be understandable in isolation, so these
 * are rejected regardless of the admin UI language.
 */
const GENERIC_LINK_LABELS = [
  // French
  'cliquez ici',
  'en savoir plus',
  'lire la suite',
  'ici',
  // English
  'click here',
  'read more',
  'learn more',
  'here',
  // German
  'hier klicken',
  'mehr erfahren',
  'weiterlesen',
  'hier',
  // Spanish
  'haz clic aquí',
  'haga clic aquí',
  'más información',
  'leer más',
  'aquí',
]

const NON_EXPLICIT_LABEL_ERROR = {
  en: 'Non-explicit link label out of context — RGAA 6.1/6.2',
  de: 'Nicht aussagekräftige Linkbezeichnung ohne Kontext — RGAA 6.1/6.2',
  es: 'Etiqueta de enlace no explícita fuera de contexto — RGAA 6.1/6.2',
  fr: 'Intitulé de lien non explicite hors contexte — RGAA 6.1/6.2',
}

export type LinkAppearances = 'default' | 'outline'

export const appearanceOptions: Record<
  LinkAppearances,
  {
    label: Record<string, string>
    value: string
  }
> = {
  default: {
    label: { en: 'Default', de: 'Standard', es: 'Predeterminado', fr: 'Défaut' },
    value: 'default',
  },
  outline: {
    label: { en: 'Outline', de: 'Umrandet', es: 'Contorno', fr: 'Contour' },
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
        ({ data, req }) => {
          const label = data?.label
          if (typeof label === 'string' && label) {
            const normalized = label.trim().toLowerCase()
            if (GENERIC_LINK_LABELS.includes(normalized)) {
              // Surface the message in the editor's own admin language.
              const adminLocale = (req?.locale ?? 'en') as keyof typeof NON_EXPLICIT_LABEL_ERROR
              throw new Error(
                NON_EXPLICIT_LABEL_ERROR[adminLocale] ?? NON_EXPLICIT_LABEL_ERROR.en,
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
                  de: 'Interner Link',
                  es: 'Enlace interno',
                  fr: 'Lien interne',
                },
                value: 'reference',
              },
              {
                label: {
                  en: 'Custom URL',
                  de: 'Eigene URL',
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
              de: 'In neuem Tab öffnen',
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
        de: 'Dokument, auf das verlinkt wird',
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
        de: 'Eigene URL',
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
          // Localized so navigation and CTA labels can be translated per locale.
          localized: true,
          admin: {
            width: '50%',
          },
          label: {
            en: 'Label',
            de: 'Bezeichnung',
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
          de: 'Wählen Sie, wie der Link dargestellt werden soll.',
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
