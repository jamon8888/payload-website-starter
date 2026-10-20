'use client'

import React, { useState } from 'react'

import RichText from '@/components/RichText'
import { Accordion as A11yAccordion, AccordionItem } from '@/components/a11y'

import type { AccordionBlock as AccordionBlockProps } from '@/payload-types'

type Props = AccordionBlockProps & {
  className?: string
}

export const AccordionBlock: React.FC<Props> = ({ className, items }) => {
  const [openItems, setOpenItems] = useState<string[]>([])

  return (
    <A11yAccordion
      className={className}
      onValueChange={(value) => setOpenItems(Array.isArray(value) ? value : value ? [value] : [])}
      type="multiple"
      value={openItems}
    >
      {(items || []).map((item, index) => (
        <AccordionItem key={index} title={item?.title || ''} value={`item-${index}`}>
          {item?.content ? <RichText data={item.content} enableGutter={false} /> : null}
        </AccordionItem>
      ))}
    </A11yAccordion>
  )
}
