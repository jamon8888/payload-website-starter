import React from 'react'

interface SpeakableMarkupProps {
  cssSelector?: string[]
}

export const SpeakableMarkup: React.FC<SpeakableMarkupProps> = ({
  cssSelector = ['.aeo-summary'],
}) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SpeakableSpecification',
    cssSelector,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}