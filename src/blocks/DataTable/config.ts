import type { Block } from 'payload'

export const DataTable: Block = {
  slug: 'dataTable',
  interfaceName: 'DataTableBlock',
  labels: {
    singular: { en: 'Data table', de: 'Datentabelle', es: 'Tabla de datos', fr: 'Tableau de données' },
    plural: { en: 'Data tables', de: 'Datentabellen', es: 'Tablas de datos', fr: 'Tableaux de données' },
  },
  fields: [
    {
      name: 'caption',
      type: 'text',
      localized: true,
      required: true,
      label: {
        en: 'Caption',
        de: 'Beschriftung',
        es: 'Leyenda',
        fr: 'Légende',
      },
      admin: {
        description: {
          en: 'Mandatory: it names the table for people who cannot see it.',
          de: 'Pflichtangabe: benennt die Tabelle für Menschen, die sie nicht sehen können.',
          es: 'Obligatorio: nombra la tabla para quienes no pueden verla.',
          fr: 'Obligatoire : nomme le tableau pour les personnes qui ne peuvent pas le voir.',
        },
      },
    },
    {
      name: 'header',
      type: 'array',
      required: true,
      label: {
        en: 'Header row',
        de: 'Kopfzeile',
        es: 'Fila de encabezado',
        fr: 'Ligne d’en-tête',
      },
      fields: [
        {
          name: 'cell',
          type: 'text',
          localized: true,
          required: true,
          label: { en: 'Column', de: 'Spalte', es: 'Columna', fr: 'Colonne' },
        },
      ],
    },
    {
      name: 'rows',
      type: 'array',
      label: {
        en: 'Rows',
        de: 'Zeilen',
        es: 'Filas',
        fr: 'Lignes',
      },
      fields: [
        {
          name: 'cells',
          type: 'array',
          fields: [
            {
              name: 'cell',
              type: 'text',
              localized: true,
              label: { en: 'Cell', de: 'Zelle', es: 'Celda', fr: 'Cellule' },
            },
          ],
        },
      ],
    },
  ],
}
