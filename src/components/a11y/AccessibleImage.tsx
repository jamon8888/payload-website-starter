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

  return (
    <MediaComponent
      className={className}
      imgClassName={imgClassName}
      pictureClassName={pictureClassName}
      resource={asset}
      alt={role === 'decorative' ? '' : alt || ''}
    />
  )
}