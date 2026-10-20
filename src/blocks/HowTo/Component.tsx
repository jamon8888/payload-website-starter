import React from 'react'

import { HowToMarkup } from '@/components/schema'

import type { HowToBlock as HowToBlockProps } from '@/payload-types'

type Props = HowToBlockProps & {
  className?: string
}

export const HowToBlock: React.FC<Props> = (props) => {
  const { className, description, estimatedCost, name, steps, supply, tool, totalTime } = props

  const markupSteps = (steps || []).map((step) => ({
    name: step?.name || '',
    text: step?.text || '',
    url: step?.url || undefined,
  }))

  if (!name || !markupSteps.length) return null

  return (
    <div className={className}>
      <HowToMarkup
        description={description || undefined}
        estimatedCost={
          estimatedCost?.currency && typeof estimatedCost?.value === 'number'
            ? { currency: estimatedCost.currency, value: estimatedCost.value }
            : undefined
        }
        name={name}
        steps={markupSteps}
        supply={(supply || []).map((item) => ({ name: item?.name || '' }))}
        tool={(tool || []).map((item) => ({ name: item?.name || '' }))}
        totalTime={totalTime || undefined}
      />

      <section aria-labelledby="howto">
        <h2 id="howto" className="text-2xl font-semibold mb-4">
          {name}
        </h2>
        {description ? <p className="mb-6 text-muted-foreground">{description}</p> : null}

        <ol className="space-y-6">
          {markupSteps.map((step, index) => (
            <li key={index}>
              <h3 className="font-medium mb-1">{step.name}</h3>
              <p className="text-muted-foreground">{step.text}</p>
              {step.url ? (
                <a
                  className="text-primary hover:underline text-sm"
                  href={step.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {step.url}
                </a>
              ) : null}
            </li>
          ))}
        </ol>

        {totalTime ? (
          <p className="mt-6 text-sm text-muted-foreground">
            <span className="font-medium">Duration:</span> {totalTime}
          </p>
        ) : null}
      </section>
    </div>
  )
}
