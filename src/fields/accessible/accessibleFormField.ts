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
        de: 'Bezeichnung',
        fr: 'Libellé',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      label: {
        en: 'Field Name (HTML name attribute)',
        de: 'Feldname (HTML-Attribut name)',
        fr: 'Nom du champ (attribut HTML name)',
      },
    },
    {
      name: 'required',
      type: 'checkbox',
      defaultValue: false,
      label: {
        en: 'Required Field',
        de: 'Pflichtfeld',
        fr: 'Champ requis',
      },
    },
    {
      name: 'helpText',
      type: 'text',
      label: {
        en: 'Help Text (displayed below field)',
        de: 'Hilfetext (wird unter dem Feld angezeigt)',
        fr: 'Texte d\'aide (affiché sous le champ)',
      },
    },
    {
      name: 'errorMessage',
      type: 'text',
      label: {
        en: 'Error Message (for validation)',
        de: 'Fehlermeldung (für die Validierung)',
        fr: 'Message d\'erreur (pour la validation)',
      },
    },
  ],
}