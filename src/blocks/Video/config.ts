import type { Block } from 'payload'

import { accessibleVideo } from '@/fields/accessible'

export const Video: Block = {
  slug: 'video',
  interfaceName: 'VideoBlock',
  labels: {
    singular: { en: 'Video', de: 'Video', es: 'Vídeo', fr: 'Vidéo' },
    plural: { en: 'Videos', de: 'Videos', es: 'Vídeos', fr: 'Vidéos' },
  },
  fields: [
    accessibleVideo,
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
      admin: {
        description: {
          en: 'Displayed next to the video and used as its accessible name.',
          de: 'Wird neben dem Video angezeigt und dient als zugänglicher Name.',
          es: 'Se muestra junto al vídeo y se usa como nombre accesible.',
          fr: 'Affiché à côté de la vidéo et utilisé comme nom accessible.',
        },
      },
    },
  ],
}
