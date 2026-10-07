import React from 'react'

import { FAQMarkup, SpeakableMarkup } from '@/components/schema'

export interface AEORelatedAnswerBlock {
  question?: string | null
  answer?: string | null
  sourceLink?: string | null
}

export interface AEORelated {
  aeoSummary?: string | null
  answerBlocks?: AEORelatedAnswerBlock[] | null
}

interface AEOSectionProps {
  aeo?: AEORelated | null
}

/**
 * Renders the AEO/GEO content that editors fill in on Pages and Posts:
 * an AI-oriented summary plus an FAQ. Emits the matching FAQPage and
 * SpeakableSpecification JSON-LD alongside the visible content.
 */
export const AEOSection: React.FC<AEOSectionProps> = ({ aeo }) => {
  if (!aeo?.aeoSummary && !aeo?.answerBlocks?.length) return null

  const answerBlocks = (aeo.answerBlocks ?? []).filter(
    (block) => Boolean(block.question && block.answer),
  ) as Array<{ question: string; answer: string; sourceLink?: string }>

  return (
    <>
      {aeo.aeoSummary && <SpeakableMarkup cssSelector={['.aeo-summary']} />}
      {answerBlocks.length > 0 && <FAQMarkup answerBlocks={answerBlocks} />}

      <section aria-labelledby="aeo" className="container max-w-[48rem] mx-auto mt-12">
        {aeo.aeoSummary && (
          <div className="aeo-summary mb-8 rounded-lg border border-border bg-muted/40 p-5">
            <p className="text-base leading-relaxed">{aeo.aeoSummary}</p>
          </div>
        )}

        {answerBlocks.length > 0 && (
          <div>
            <h2 id="aeo" className="text-2xl font-semibold mb-4">
              FAQ
            </h2>
            <dl className="space-y-6">
              {answerBlocks.map((block, index) => (
                <div key={index}>
                  <dt className="font-medium mb-1">{block.question}</dt>
                  <dd>
                    <p className="text-muted-foreground">{block.answer}</p>
                    {block.sourceLink && (
                      <a
                        href={block.sourceLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm"
                      >
                        {block.sourceLink}
                      </a>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </section>
    </>
  )
}