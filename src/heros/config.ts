import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: {
        en: 'Type',
        es: 'Tipo',
        fr: 'Type',
      },
      options: [
        {
          label: {
            en: 'None',
            es: 'Ninguno',
            fr: 'Aucun',
          },
          value: 'none',
        },
        {
          label: {
            en: 'High Impact',
            es: 'Alto Impacto',
            fr: 'Fort Impact',
          },
          value: 'highImpact',
        },
        {
          label: {
            en: 'Medium Impact',
            es: 'Impacto Medio',
            fr: 'Impact Moyen',
          },
          value: 'mediumImpact',
        },
        {
          label: {
            en: 'Low Impact',
            es: 'Bajo Impacto',
            fr: 'Faible Impact',
          },
          value: 'lowImpact',
        },
      ],
      required: true,
      localized: true,
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
      localized: true,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
      label: {
        en: 'Media',
        es: 'Medio',
        fr: 'Média',
      },
    },
  ],
  label: false,
}
