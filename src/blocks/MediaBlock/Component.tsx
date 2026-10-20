import type { StaticImageData } from 'next/image'
import type { Media as MediaType } from '@/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

import { Media } from '../../components/Media'
import { AccessibleImage } from '@/components/a11y'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    image,
    staticImage,
    disableInnerContainer,
  } = props

  let caption: MediaType['caption'] | null = null
  let mediaResource: number | MediaType | null = null

  if (image && typeof image === 'object' && image.asset) {
    mediaResource = image.asset
    if (typeof mediaResource === 'object' && mediaResource.caption) {
      caption = mediaResource.caption
    }
  }

  return (
    <div
      className={cn(
        '',
        {
          container: enableGutter,
        },
        className,
      )}
    >
      {staticImage ? (
        <Media
          imgClassName={cn('border border-border rounded-[0.8rem]', imgClassName)}
          resource={mediaResource}
          src={staticImage}
        />
      ) : (
        // `AccessibleImage` applies the block's own `role`/`alt`: a decorative
        // image is rendered with an empty alt, an informative one with the
        // editor-authored alternative. The media document's own alt stays the
        // fallback for blocks that do not carry an accessible image group.
        <AccessibleImage
          image={image}
          imgClassName={cn('border border-border rounded-[0.8rem]', imgClassName)}
        />
      )}
      {caption && (
        <div
          className={cn(
            'mt-6',
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          <RichText data={caption} enableGutter={false} />
        </div>
      )}
    </div>
  )
}
