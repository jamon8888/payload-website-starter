import React from 'react'

interface AccessibleEmbedProps {
  embed: {
    src: string
    title: string
  } | null
  className?: string
}

export const AccessibleEmbed: React.FC<AccessibleEmbedProps> = ({
  embed,
  className,
}) => {
  if (!embed?.src) return null

  return (
    <iframe
      src={embed.src}
      title={embed.title}
      loading="lazy"
      className={className}
      frameBorder="0"
      allowFullScreen
    />
  )
}