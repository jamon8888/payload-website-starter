'use client'

import React, { useState } from 'react'

import RichText from '@/components/RichText'
import { Modal } from '@/components/a11y'

import type { ModalBlock as ModalBlockProps } from '@/payload-types'

type Props = ModalBlockProps & {
  className?: string
}

export const ModalBlock: React.FC<Props> = ({
  className,
  content,
  description,
  title,
  triggerLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={className}>
      <button
        className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        {triggerLabel}
      </button>

      <Modal
        description={description || undefined}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title || ''}
      >
        {content ? <RichText data={content} enableGutter={false} /> : null}
      </Modal>
    </div>
  )
}
