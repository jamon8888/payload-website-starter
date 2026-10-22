import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'
import { slugField } from 'payload'

import {
  revalidateStatementDelete,
  revalidateStatements,
} from './AccessibilityStatements/hooks/revalidateStatements'

/**
 * RGAA 13.3 requires an accessibility statement for every content. The site
 * level statement lives in the `accessibility-statement` global; this
 * collection holds one statement per audited content (page or post), with the
 * non-conformities of that content and the reason for any derogation.
 */
export const AccessibilityStatements: CollectionConfig<'accessibility-statements'> = {
  slug: 'accessibility-statements',
  hooks: {
    afterChange: [revalidateStatements],
    afterDelete: [revalidateStatementDelete],
  },
  labels: {
    singular: {
      en: 'Accessibility statement',
      de: 'Erklärung zur Barrierefreiheit',
      es: 'Declaración de accesibilidad',
      fr: 'Déclaration d’accessibilité',
    },
    plural: {
      en: 'Accessibility statements',
      de: 'Erklärungen zur Barrierefreiheit',
      es: 'Declaraciones de accesibilidad',
      fr: 'Déclarations d’accessibilité',
    },
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'content', 'status', 'auditDate', 'updatedAt'],
    useAsTitle: 'title',
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
      label: {
        en: 'Title',
        de: 'Titel',
        es: 'Título',
        fr: 'Titre',
      },
    },
    {
      name: 'content',
      type: 'relationship',
      relationTo: ['pages', 'posts'],
      required: true,
      label: {
        en: 'Audited content',
        de: 'Geprüfter Inhalt',
        es: 'Contenido auditado',
        fr: 'Contenu audité',
      },
      admin: {
        description: {
          en: 'The page or post this statement applies to.',
          de: 'Die Seite oder der Beitrag, für den diese Erklärung gilt.',
          es: 'La página o el artículo al que se aplica esta declaración.',
          fr: 'La page ou l’article auquel cette déclaration s’applique.',
        },
      },
    },
    {
      // Not named `status`: Payload reserves `_status` for drafts, and a
      // `status` field would collide with that enum in the Postgres schema.
      name: 'complianceStatus',
      type: 'select',
      required: true,
      defaultValue: 'partiallyConformant',
      options: [
        {
          label: { en: 'Fully compliant', de: 'Vollständig konform', es: 'Totalmente conforme', fr: 'Totalement conforme' },
          value: 'conformant',
        },
        {
          label: {
            en: 'Partially compliant',
            de: 'Teilweise konform',
            es: 'Parcialmente conforme',
            fr: 'Partiellement conforme',
          },
          value: 'partiallyConformant',
        },
        {
          label: { en: 'Not compliant', de: 'Nicht konform', es: 'No conforme', fr: 'Non conforme' },
          value: 'nonConformant',
        },
      ],
      label: {
        en: 'Compliance status',
        de: 'Konformitätsstatus',
        es: 'Estado de conformidad',
        fr: 'État de conformité',
      },    },
    {
      name: 'auditDate',
      type: 'date',
      required: true,
      label: {
        en: 'Audit date',
        de: 'Datum der Prüfung',
        es: 'Fecha de auditoría',
        fr: 'Date d’audit',
      },
    },
    {
      name: 'referentielVersion',
      type: 'text',
      defaultValue: 'RGAA 4.1.2',
      required: true,
      label: {
        en: 'Reference version',
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
        en: 'Compliance rate (%)',
        de: 'Erfüllungsgrad (%)',
        es: 'Tasa de cumplimiento (%)',
        fr: 'Taux de conformité (%)',
      },
    },
    {
      name: 'nonConformCriteria',
      type: 'array',
      // Short db name: the generated index names would otherwise exceed
      // Postgres' 63-character identifier limit and be silently truncated.
      dbName: 'nccriteria',
      label: {
        en: 'Non-conformant criteria',
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
            fr: 'Critère (ex. 10.1)',
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
            fr: 'Thématique (ex. Images, Couleurs)',
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
        en: 'Contact email',
        de: 'Kontakt-E-Mail',
        es: 'Email de contacto',
        fr: 'Email de contact',
      },
    },
    {
      name: 'statement',
      type: 'richText',
      localized: true,
      label: {
        en: 'Statement',
        de: 'Erklärung',
        es: 'Declaración',
        fr: 'Déclaration',
      },
    },
    {
      name: 'schemaPluriannuelUrl',
      type: 'text',
      label: {
        en: 'Multiannual scheme URL (3 years)',
        de: 'URL des mehrjährigen Plans (3 Jahre)',
        es: 'URL del plan plurianual (3 años)',
        fr: 'Lien vers le schéma pluriannuel (3 ans)',
      },
    },
    {
      name: 'planActionAnnuelUrl',
      type: 'text',
      label: {
        en: 'Annual action plan URL',
        de: 'URL des jährlichen Maßnahmenplans',
        es: 'URL del plan de acción anual',
        fr: 'Lien vers le plan d’action annuel',
      },
    },
    slugField(),
  ],
  versions: {
    drafts: {
      autosave: true,
    },
    maxPerDoc: 50,
  },
}
