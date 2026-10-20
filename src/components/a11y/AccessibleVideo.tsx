import React from 'react'
import { getLocale, getTranslations } from 'next-intl/server'
import { cn } from '@/utilities/ui'
import type { Media } from '@/payload-types'

import { getMediaUrl } from '@/utilities/getMediaUrl'

interface AccessibleVideoProps {
  video: {
    asset: number | Media
    captions: number | Media
    audioDescription?: number | Media | null
  } | null
  /** Rendered transcript — a rich text, so it is passed in already rendered. */
  transcript?: React.ReactNode
  className?: string
}

export const AccessibleVideo: React.FC<AccessibleVideoProps> = async ({
  video,
  transcript,
  className,
}) => {
  const t = await getTranslations('a11y')
  const locale = await getLocale()

  if (!video || !video.asset || typeof video.asset === 'number') {
    return null
  }

  // Fail-closed: don't render if captions are missing
  if (!video.captions || typeof video.captions === 'number') {
    return (
      <div className={className} role="alert">
        <p>{t('videoCaptionsMissing')}</p>
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
      <video controls playsInline className={cn('w-full max-w-lg')}>
        <source src={videoUrl} type={mimeType} />
        <track
          kind="captions"
          src={captionsUrl}
          srcLang={locale}
          label={t('captionsLabel')}
          default
        />
      </video>

      {transcript ? (
        <details className="mt-4">
          <summary className="cursor-pointer font-medium">{t('showTranscript')}</summary>
          <div className="mt-2 prose prose-sm max-w-none">{transcript}</div>
        </details>
      ) : null}

      {video.audioDescription && typeof video.audioDescription === 'object' ? (
        <p className="mt-2 text-sm text-muted-foreground">
          {t('audioDescription')}{' '}
          <a
            href={getMediaUrl(`/media/${(video.audioDescription as Media).filename}`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('download')}
          </a>
        </p>
      ) : null}
    </div>
  )
}
