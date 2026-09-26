import type { Field } from 'payload'

export interface AccessibleDataTable {
  caption: string
  headerRow: Array<{ cell: string }>
  rows: Array<{ cells: Array<{ cell: string }> }>
}

export const accessibleDataTable: Field = {
  name: 'dataTable',
  type: 'group',
  localized: true,
  fields: [
    {
      name: 'caption',
      type: 'text',
      required: true,
      label: {
        en: 'Caption (required, describes the table)',
        fr: 'Légende (obligatoire, décrit le tableau)',
      },
    },
    {
      name: 'headerRow',
      type: 'array',
      required: true,
      label: {
        en: 'Header Row',
        fr: 'Ligne d\'en-tête',
      },
      fields: [
        {
          name: 'cell',
          type: 'text',
          required: true,
          label: {
            en: 'Header Cell',
            fr: 'Cellule d\'en-tête',
          },
        },
      ],
    },
    {
      name: 'rows',
      type: 'array',
      required: true,
      label: {
        en: 'Data Rows',
        fr: 'Lignes de données',
      },
      fields: [
        {
          name: 'cells',
          type: 'array',
          fields: [
            {
              name: 'cell',
              type: 'text',
              label: {
                en: 'Cell',
                fr: 'Cellule',
              },
            },
          ],
        },
      ],
    },
  ],
}