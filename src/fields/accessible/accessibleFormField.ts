import type { Field } from 'payload'

export interface AccessibleFormField {
  label: string
  name: string
  required?: boolean
  helpText?: string
  errorMessage?: string
}

export const accessibleFormField: Field = {
  name: 'formField',
  type: 'group',
  localized: true,
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      label: {
        en: 'Label',
        fr: 'Libellé',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      label: {
        en: 'Field Name (HTML name attribute)',
        fr: 'Nom du champ (attribut HTML name)',
      },
    },
    {
      name: 'required',
      type: 'checkbox',
      defaultValue: false,
      label: {
        en: 'Required Field',
        fr: 'Champ requis',
      },
    },
    {
      name: 'helpText',
      type: 'text',
      label: {
        en: 'Help Text (displayed below field)',
        fr: 'Texte d\'aide (affiché sous le champ)',
      },
    },
    {
      name: 'errorMessage',
      type: 'text',
      label: {
        en: 'Error Message (for validation)',
        fr: 'Message d\'erreur (pour la validation)',
      },
    },
  ],
}