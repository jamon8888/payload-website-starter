import React from 'react'
import type { Media } from '@/payload-types'

import { Media as MediaComponent } from '@/components/Media'

interface AccessibleImageProps {
  image: {
    asset: number | Media
    role: 'informative' | 'decorative'
    alt?: string | null
  } | null
  className?: string
  imgClassName?: string
  pictureClassName?: string
}

export const AccessibleImage: React.FC<AccessibleImageProps> = ({
  image,
  className,
  imgClassName,
  pictureClassName,
}) => {
  if (!image || !image.asset || typeof image.asset === 'number') {
    return null
  }

  const { asset, role, alt } = image

  // A decorative image carries no information, so it is hidden from assistive
  // technologies. An informative image uses the alternative text authored on
  // the block, falling back to the one stored on the media document.
  const resolvedAlt = role === 'decorative' ? '' : alt || asset.alt || ''

  return (
    <MediaComponent
      alt={resolvedAlt}
      className={className}
      imgClassName={imgClassName}
      pictureClassName={pictureClassName}
      resource={asset}
    />
  )
}
