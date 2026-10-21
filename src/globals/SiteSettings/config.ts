import type { GlobalConfig } from 'payload'

import { revalidateSiteSettings } from './hooks/revalidateSiteSettings'

/**
 * The customizer: everything that is not content but defines the identity of
 * the site — brand, theme and SEO defaults. Editable from the admin, so a
 * rebrand does not require a deploy.
 */
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: {
    en: 'Site settings',
    de: 'Website-Einstellungen',
    es: 'Ajustes del sitio',
    fr: 'Paramètres du site',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateSiteSettings],
  },
  admin: {
    description: {
      en: 'Brand, theme and SEO defaults. These values are injected into every page.',
      de: 'Marke, Theme und SEO-Standardwerte. Diese Werte werden in jede Seite übernommen.',
      es: 'Marca, tema y valores SEO predeterminados. Se inyectan en todas las páginas.',
      fr: 'Marque, thème et valeurs SEO par défaut. Ces valeurs sont injectées dans toutes les pages.',
    },
  },
  fields: [
    {
      name: 'brandName',
      type: 'text',
      localized: true,
      required: true,
      defaultValue: 'Payload Website',
      label: {
        en: 'Brand name',
        de: 'Markenname',
        es: 'Nombre de la marca',
        fr: 'Nom de la marque',
      },
      admin: {
        description: {
          en: 'Used in the titles, the footer and the social cards.',
          de: 'Wird in den Titeln, der Fußzeile und den Social Cards verwendet.',
          es: 'Se usa en los títulos, el pie de página y las tarjetas sociales.',
          fr: 'Utilisé dans les titres, le pied de page et les cartes sociales.',
        },
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: {
        en: 'Logo',
        de: 'Logo',
        es: 'Logotipo',
        fr: 'Logo',
      },
    },
    {
      name: 'theme',
      type: 'group',
      label: {
        en: 'Theme',
        de: 'Theme',
        es: 'Tema',
        fr: 'Thème',
      },
      fields: [
        {
          name: 'primaryColor',
          type: 'text',
          defaultValue: 'oklch(20.5% 0 0deg)',
          label: {
            en: 'Primary colour',
            de: 'Primärfarbe',
            es: 'Color primario',
            fr: 'Couleur principale',
          },
          admin: {
            description: {
              en: 'Any CSS colour: oklch(), hex or rgb(). The dark theme inverts it.',
              de: 'Beliebige CSS-Farbe: oklch(), Hex oder rgb(). Das dunkle Theme invertiert sie.',
              es: 'Cualquier color CSS: oklch(), hex o rgb(). El tema oscuro lo invierte.',
              fr: 'N’importe quelle couleur CSS : oklch(), hex ou rgb(). Le thème sombre l’inverse.',
            },
          },
        },
        {
          name: 'primaryForeground',
          type: 'text',
          defaultValue: 'oklch(98.5% 0 0deg)',
          label: {
            en: 'Primary foreground',
            de: 'Primärvordergrund',
            es: 'Primer plano primario',
            fr: 'Premier plan principal',
          },
        },
        {
          name: 'radius',
          type: 'select',
          defaultValue: 'md',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
          ],
          label: { en: 'Corner radius', de: 'Eckenradius', es: 'Radio de esquina', fr: 'Rayon des coins' },
        },
        {
          name: 'fontFamily',
          type: 'select',
          defaultValue: 'geist',
          options: [
            { label: 'Geist', value: 'geist' },
            { label: 'System', value: 'system' },
            { label: 'Serif', value: 'serif' },
          ],
          label: { en: 'Font', de: 'Schriftart', es: 'Fuente', fr: 'Police' },
        },
        {
          name: 'defaultTheme',
          type: 'select',
          defaultValue: 'system',
          options: [
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
            { label: 'Follow the system', value: 'system' },
          ],
          label: {
            en: 'Default colour scheme',
            de: 'Standard-Farbschema',
            es: 'Esquema de color predeterminado',
            fr: 'Thème de couleur par défaut',
          },
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      label: { en: 'SEO', de: 'SEO', es: 'SEO', fr: 'SEO' },
      fields: [
        {
          name: 'titleTemplate',
          type: 'text',
          defaultValue: '%s | {site}',
          label: { en: 'Title template', de: 'Titel-Vorlage', es: 'Plantilla de título', fr: 'Gabarit de titre' },
          admin: {
            description: {
              en: '%s is replaced by the page title, {site} by the brand name.',
              de: '%s wird durch den Seitentitel ersetzt, {site} durch den Markennamen.',
              es: '%s se sustituye por el título de la página y {site} por el nombre de la marca.',
              fr: '%s est remplacé par le titre de la page, {site} par le nom de la marque.',
            },
          },
        },
        {
          name: 'defaultDescription',
          type: 'textarea',
          localized: true,
          label: {
            en: 'Default description',
            de: 'Standardbeschreibung',
            es: 'Descripción predeterminada',
            fr: 'Description par défaut',
          },
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          label: { en: 'Default social image', de: 'Standard-Bild', es: 'Imagen social predeterminada', fr: 'Image social par défaut' },
        },
        {
          name: 'twitterHandle',
          type: 'text',
          label: { en: 'X / Twitter handle', de: 'X-/Twitter-Handle', es: 'Usuario de X/Twitter', fr: 'Compte X / Twitter' },
        },
      ],
    },
  ],
}
