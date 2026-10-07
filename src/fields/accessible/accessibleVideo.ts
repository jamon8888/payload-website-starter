import type { Field } from 'payload'

export interface AccessibleVideo {
  asset: string | number | { url: string; filename?: string }
  captions: string | number | { url: string; filename?: string }
  transcript: string
  audioDescription?: string | number | { url: string; filename?: string }
}

export const accessibleVideo: Field = {
  name: 'video',
  type: 'group',
  localized: true,
  fields: [
    {
      name: 'asset',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: {
        en: 'Video File',
        de: 'Videodatei',
        fr: 'Fichier vidéo',
      },
    },
    {
      name: 'captions',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: {
        en: 'Captions (.vtt)',
        de: 'Untertitel (.vtt)',
        fr: 'Sous-titres (.vtt)',
      },
      admin: {
        description: {
          en: 'WebVTT caption file required for accessibility compliance',
          de: 'WebVTT-Untertiteldatei ist für die Barrierefreiheitskonformität erforderlich',
          fr: 'Fichier de sous-titres WebVTT requis pour la conformité accessibilité',
        },
      },
    },
    {
      name: 'transcript',
      type: 'richText',
      localized: true,
      required: true,
      label: {
        en: 'Text Transcript',
        de: 'Texttranskript',
        fr: 'Transcription textuelle',
      },
    },
    {
      name: 'audioDescription',
      type: 'upload',
      relationTo: 'media',
      label: {
        en: 'Audio Description Track',
        de: 'Audiodeskriptionsspur',
        fr: 'Piste d\'audiodescription',
      },
      admin: {
        description: {
          en: 'Required if video conveys visual information not in the main audio',
          de: 'Erforderlich, wenn das Video visuelle Informationen vermittelt, die im Hauptton nicht enthalten sind',
          fr: 'Requis si la vidéo transmet des informations visuelles absentes de l\'audio principal',
        },
      },
    },
  ],
}