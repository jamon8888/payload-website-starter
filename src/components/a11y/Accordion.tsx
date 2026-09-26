'use client'

import React from 'react'
import { cn } from '@/utilities/ui'
import { ChevronDown } from 'lucide-react'

interface AccordionItemProps {
  value: string
  title: string
  children: React.ReactNode
  disabled?: boolean
}

interface AccordionProps {
  type?: 'single' | 'multiple'
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  children: React.ReactNode
  className?: string
  allowMultipleOpen?: boolean
}

export const Accordion: React.FC<AccordionProps> = ({
  type = 'single',
  value,
  onValueChange,
  children,
  className,
}) => {
  return (
    <div className={cn('space-y-2', className)} data-type={type}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            isOpen:
              type === 'single'
                ? value === (child.props as AccordionItemProps).value
                : (value as string[])?.includes((child.props as AccordionItemProps).value),
            onToggle: (itemValue: string) => {
              if (type === 'single') {
                onValueChange?.(value === itemValue ? '' : itemValue)
              } else {
                const currentValues = (value as string[]) || []
                onValueChange?.(
                  currentValues.includes(itemValue)
                    ? currentValues.filter((v) => v !== itemValue)
                    : [...currentValues, itemValue]
                )
              }
            },
          })
        }
        return child
      })}
    </div>
  )
}

interface AccordionItemInternalProps extends AccordionItemProps {
  isOpen: boolean
  onToggle: (value: string) => void
}

export const AccordionItem: React.FC<AccordionItemInternalProps> = ({
  value,
  title,
  children,
  isOpen,
  onToggle,
  disabled,
}) => {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => !disabled && onToggle(value)}
        disabled={disabled}
        className={cn(
          'flex w-full items-center justify-between px-4 py-3 text-left font-medium transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          disabled && 'opacity-50 pointer-events-none'
        )}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${value}`}
        id={`accordion-trigger-${value}`}
      >
        {title}
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
          aria-hidden="true"
        />
      </button>
      <div
        id={`accordion-content-${value}`}
        role="region"
        aria-labelledby={`accordion-trigger-${value}`}
        className={cn(
          'overflow-hidden transition-all duration-200',
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-4 pb-4">{children}</div>
      </div>
    </div>
  )
}