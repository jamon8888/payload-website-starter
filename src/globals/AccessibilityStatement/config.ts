import type { GlobalConfig } from 'payload'

export const AccessibilityStatement: GlobalConfig = {
  slug: 'accessibility-statement',
  label: {
    en: 'Accessibility Statement',
    de: 'Erklärung zur Barrierefreiheit',
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
        de: 'Datum der Prüfung',
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
        de: 'Version des Referenzstandards',
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
        de: 'Gesamterfüllungsgrad (%)',
        es: 'Tasa de cumplimiento global (%)',
        fr: 'Taux de conformité global (%)',
      },
    },
    {
      name: 'nonConformCriteria',
      type: 'array',
      label: {
        en: 'Non-Conformant Criteria',
        de: 'Nicht konforme Kriterien',
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
            de: 'Kriterium (z. B. 10.1)',
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
            de: 'Thematik (z. B. Bilder, Farben)',
            es: 'Temática (ej. Imágenes, Colores)',
            fr: 'Thématique (ex: Images, Couleurs)',
          },
        },
        {
          name: 'derogation',
          type: 'checkbox',
          label: {
            en: 'Derogation for disproportionate burden',
            de: 'Ausnahme wegen unverhältnismäßiger Belastung',
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
            de: 'Begründung',
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
        de: 'Kontakt-E-Mail',
        es: 'Email de contacto',
        fr: 'Email de contact',
      },
    },
    {
      name: 'schemaPluriannuelUrl',
      type: 'text',
      label: {
        en: 'Multiannual Scheme URL (3 years)',
        de: 'URL des mehrjährigen Plans (3 Jahre)',
        es: 'URL del plan plurianual (3 años)',
        fr: 'Lien vers le schéma pluriannuel (3 ans)',
      },
    },
    {
      name: 'planActionAnnuelUrl',
      type: 'text',
      label: {
        en: 'Annual Action Plan URL',
        de: 'URL des jährlichen Maßnahmenplans',
        es: 'URL del plan de acción anual',
        fr: 'Lien vers le plan d\'action annuel',
      },
    },
  ],
}