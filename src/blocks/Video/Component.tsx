import React from 'react'

import RichText from '@/components/RichText'
import { AccessibleVideo } from '@/components/a11y'

import type { VideoBlock as VideoBlockProps } from '@/payload-types'

type Props = VideoBlockProps & {
  className?: string
}

export const VideoBlock: React.FC<Props> = ({ className, title, video }) => {
  const transcript = video?.transcript ? (
    <RichText data={video.transcript} enableGutter={false} />
  ) : null

  return (
    <figure className={className}>
      {title ? <figcaption className="mb-2 font-medium">{title}</figcaption> : null}
      <AccessibleVideo transcript={transcript} video={video} />
    </figure>
  )
}
