import type { Block } from 'payload'

import { accessibleImage } from '@/fields/accessible'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    accessibleImage,
  ],
}
