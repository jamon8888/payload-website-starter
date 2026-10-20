import React from 'react'

import { AccessibleEmbed } from '@/components/a11y'

import type { EmbedBlock as EmbedBlockProps } from '@/payload-types'

type Props = EmbedBlockProps & {
  className?: string
}

export const EmbedBlock: React.FC<Props> = ({ className, description, title, url }) => {
  if (!url) return null

  return (
    <div className={className}>
      <AccessibleEmbed
        className="aspect-video w-full rounded-[0.8rem] border border-border"
        embed={{ src: url, title: title || url }}
      />
      {description ? (
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      ) : null}
    </div>
  )
}
