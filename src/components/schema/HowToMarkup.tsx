import React from 'react'

interface HowToStep {
  name: string
  text: string
  url?: string
  image?: string
}

interface HowToMarkupProps {
  name: string
  description?: string
  steps: HowToStep[]
  totalTime?: string
  estimatedCost?: { currency: string; value: number }
  supply?: Array<{ name: string }>
  tool?: Array<{ name: string }>
}

export const HowToMarkup: React.FC<HowToMarkupProps> = ({
  name,
  description,
  steps,
  totalTime,
  estimatedCost,
  supply,
  tool,
}) => {
  if (!steps?.length) return null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.url && { url: step.url }),
      ...(step.image && { image: step.image }),
    })),
    ...(totalTime && { totalTime }),
    ...(estimatedCost && { estimatedCost: { '@type': 'MonetaryAmount', currency: estimatedCost.currency, value: estimatedCost.value } }),
    ...(supply && { supply: supply.map((s) => ({ '@type': 'HowToSupply', name: s.name })) }),
    ...(tool && { tool: tool.map((t) => ({ '@type': 'HowToTool', name: t.name })) }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}