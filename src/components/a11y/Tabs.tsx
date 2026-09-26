'use client'

import React, { useState } from 'react'
import { cn } from '@/utilities/ui'

interface TabsProps {
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
  className?: string
  defaultValue?: string
}

export const Tabs: React.FC<TabsProps> = ({
  value,
  onValueChange,
  children,
  className,
  defaultValue,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '')
  const controlled = value !== undefined
  const currentValue = controlled ? value : internalValue

  const handleChange = (newValue: string) => {
    if (!controlled) setInternalValue(newValue)
    onValueChange?.(newValue)
  }

  return (
    <div className={cn('space-y-4', className)} data-tabs>
      <div role="tablist" className="flex border-b border-border" aria-orientation="horizontal">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === TabsList) {
            return React.cloneElement(child as React.ReactElement<any>, {
              value: currentValue,
              onValueChange: handleChange,
            })
          }
          return child
        })}
      </div>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === TabsContent) {
          const tabValue = (child.props as TabsContentProps).value
          return React.cloneElement(child as React.ReactElement<any>, {
            isActive: currentValue === tabValue,
          })
        }
        return child
      })}
    </div>
  )
}

interface TabsListProps {
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
  className?: string
}

export const TabsList: React.FC<TabsListProps> = ({
  value,
  onValueChange,
  children,
  className,
}) => {
  return (
    <div role="tablist" className={cn('flex gap-1', className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === TabsTrigger) {
          const triggerValue = (child.props as TabsTriggerProps).value
          return React.cloneElement(child as React.ReactElement<any>, {
            isActive: value === triggerValue,
            onClick: () => onValueChange(triggerValue),
          })
        }
        return child
      })}
    </div>
  )
}

interface TabsTriggerProps {
  value: string
  children: React.ReactNode
  isActive?: boolean
  onClick?: () => void
  disabled?: boolean
  className?: string
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  children,
  isActive,
  onClick,
  disabled,
  className,
}) => {
  return (
    <button
      role="tab"
      id={`tabs-trigger-${value}`}
      aria-selected={isActive}
      aria-controls={`tabs-content-${value}`}
      tabIndex={isActive ? 0 : -1}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'px-4 py-2 text-sm font-medium whitespace-nowrap rounded-t-lg transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        isActive
          ? 'bg-background text-foreground border-b-2 border-primary -mb-px'
          : 'text-muted-foreground hover:text-foreground hover:bg-accent',
        disabled && 'opacity-50 pointer-events-none',
        className
      )}
    >
      {children}
    </button>
  )
}

interface TabsContentProps {
  value: string
  children: React.ReactNode
  isActive?: boolean
  className?: string
}

export const TabsContent: React.FC<TabsContentProps> = ({
  value,
  children,
  isActive,
  className,
}) => {
  if (!isActive) return null

  return (
    <div
      role="tabpanel"
      id={`tabs-content-${value}`}
      aria-labelledby={`tabs-trigger-${value}`}
      tabIndex={0}
      className={cn('mt-4', className)}
    >
      {children}
    </div>
  )
}