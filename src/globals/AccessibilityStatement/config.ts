import type { GlobalConfig } from 'payload'

export const AccessibilityStatement: GlobalConfig = {
  slug: 'accessibility-statement',
  label: {
    en: 'Accessibility Statement',
    es: 'Declaración de accesibilidad',
    fr: 'Déclaration d\'accessibilité',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'auditDate',
      type: 'date',
      required: true,
      label: {
        en: 'Audit Date',
        es: 'Fecha de auditoría',
        fr: 'Date d\'audit',
      },
    },
    {
      name: 'referentielVersion',
      type: 'text',
      defaultValue: 'RGAA 4.1.2',
      required: true,
      label: {
        en: 'Reference Version',
        es: 'Versión de referencia',
        fr: 'Version du référentiel',
      },
    },
    {
      name: 'globalComplianceRate',
      type: 'number',
      min: 0,
      max: 100,
      required: true,
      label: {
        en: 'Global Compliance Rate (%)',
        es: 'Tasa de cumplimiento global (%)',
        fr: 'Taux de conformité global (%)',
      },
    },
    {
      name: 'nonConformCriteria',
      type: 'array',
      label: {
        en: 'Non-Conformant Criteria',
        es: 'Criterios no conformes',
        fr: 'Critères non conformes',
      },
      fields: [
        {
          name: 'criterion',
          type: 'text',
          required: true,
          label: {
            en: 'Criterion (e.g., 10.1)',
            es: 'Criterio (ej. 10.1)',
            fr: 'Critère (ex: 10.1)',
          },
        },
        {
          name: 'thematic',
          type: 'text',
          required: true,
          label: {
            en: 'Thematic (e.g., Images, Colors)',
            es: 'Temática (ej. Imágenes, Colores)',
            fr: 'Thématique (ex: Images, Couleurs)',
          },
        },
        {
          name: 'derogation',
          type: 'checkbox',
          label: {
            en: 'Derogation for disproportionate burden',
            es: 'Exención por carga desproporcionada',
            fr: 'Dérogation pour charge disproportionnée',
          },
        },
        {
          name: 'justification',
          type: 'textarea',
          localized: true,
          label: {
            en: 'Justification',
            es: 'Justificación',
            fr: 'Justification',
          },
        },
      ],
    },
    {
      name: 'contactEmail',
      type: 'email',
      required: true,
      label: {
        en: 'Contact Email',
        es: 'Email de contacto',
        fr: 'Email de contact',
      },
    },
    {
      name: 'schemaPluriannuelUrl',
      type: 'text',
      label: {
        en: 'Multiannual Scheme URL (3 years)',
        es: 'URL del plan plurianual (3 años)',
        fr: 'Lien vers le schéma pluriannuel (3 ans)',
      },
    },
    {
      name: 'planActionAnnuelUrl',
      type: 'text',
      label: {
        en: 'Annual Action Plan URL',
        es: 'URL del plan de acción anual',
        fr: 'Lien vers le plan d\'action annuel',
      },
    },
  ],
}