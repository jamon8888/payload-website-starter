import type { Media } from '@/payload-types'

export const imageHero1: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  role: 'informative',
  alt: 'Straight metallic shapes with a blue gradient',
}
