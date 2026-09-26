import React from 'react'

interface FAQMarkupProps {
  answerBlocks: Array<{
    question: string
    answer: string
    sourceLink?: string
  }>
}

export const FAQMarkup: React.FC<FAQMarkupProps> = ({ answerBlocks }) => {
  if (!answerBlocks?.length) return null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: answerBlocks.map((block) => ({
      '@type': 'Question',
      name: block.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: block.answer,
        ...(block.sourceLink && { url: block.sourceLink }),
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}