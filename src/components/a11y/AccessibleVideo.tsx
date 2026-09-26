'use client'

import React from 'react'
import { cn } from '@/utilities/ui'
import type { Media } from '@/payload-types'

import { getMediaUrl } from '@/utilities/getMediaUrl'

interface AccessibleVideoProps {
  video: {
    asset: number | Media
    captions: number | Media
    transcript: string
    audioDescription?: number | Media | null
  } | null
  className?: string
}

export const AccessibleVideo: React.FC<AccessibleVideoProps> = ({
  video,
  className,
}) => {
  if (!video || !video.asset || typeof video.asset === 'number') {
    return null
  }

  // Fail-closed: don't render if captions are missing
  if (!video.captions || typeof video.captions === 'number') {
    return (
      <div className={className} role="alert">
        <p>Video cannot be displayed: captions are required for accessibility compliance.</p>
      </div>
    )
  }

  const asset = video.asset as Media
  const captions = video.captions as Media
  const videoUrl = getMediaUrl(`/media/${asset.filename}`)
  const captionsUrl = getMediaUrl(`/media/${captions.filename}`)
  const mimeType = asset.mimeType ?? 'video/mp4'

  return (
    <div className={className}>
      <video
        controls
        playsInline
        className={cn('w-full max-w-lg')}
      >
        <source src={videoUrl} type={mimeType} />
        <track
          kind="captions"
          src={captionsUrl}
          srcLang="fr"
          label="Français"
          default
        />
      </video>

      {video.transcript && (
        <details className="mt-4">
          <summary className="cursor-pointer font-medium">
            Afficher la transcription
          </summary>
          <div className="mt-2 prose prose-sm max-w-none">
            <div dangerouslySetInnerHTML={{ __html: video.transcript }} />
          </div>
        </details>
      )}

      {video.audioDescription && typeof video.audioDescription === 'object' && (
        <p className="mt-2 text-sm text-muted-foreground">
          Audiodescription disponible:{" "}
          <a
            href={getMediaUrl(`/media/${(video.audioDescription as Media).filename}`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Télécharger
          </a>
        </p>
      )}
    </div>
  )
}