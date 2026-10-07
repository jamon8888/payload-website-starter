'use client'

import React, { useEffect, useRef } from 'react'
import { cn } from '@/utilities/ui'
import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
}) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)
  const t = useTranslations('a11y')

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement
      document.body.style.overflow = 'hidden'

      // Focus the first focusable element
      const focusables = modalRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      focusables?.[0]?.focus()

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose()
          return
        }

        if (e.key === 'Tab' && focusables?.length) {
          const first = focusables[0]
          const last = focusables[focusables.length - 1]

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault()
            last.focus()
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }

      document.addEventListener('keydown', handleKeyDown)
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        document.body.style.overflow = ''
        previousActiveElement.current?.focus()
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      aria-describedby={description ? 'modal-description' : undefined}
    >
      <div
        ref={modalRef}
        className={cn(
          'relative w-full max-w-lg rounded-lg bg-background p-6 shadow-lg',
          className
        )}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          aria-label={t('close')}
        >
          <X className="h-4 w-4" />
        </button>

        {title && (
          <h2 id="modal-title" className="text-lg font-semibold">
            {title}
          </h2>
        )}

        {description && (
          <p id="modal-description" className="mt-2 text-sm text-muted-foreground">
            {description}
          </p>
        )}

        <div className="mt-4">{children}</div>
      </div>
    </div>
  )
}