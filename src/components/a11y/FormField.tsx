import React from 'react'
import { cn } from '@/utilities/ui'

interface FormFieldProps {
  label: string
  name: string
  required?: boolean
  helpText?: string
  errorMessage?: string
  children: React.ReactNode
  className?: string
  id?: string
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  required,
  helpText,
  errorMessage,
  children,
  className,
  id: providedId,
}) => {
  const fieldId = providedId || name
  const helpId = helpText ? `${fieldId}-help` : undefined
  const errorId = errorMessage ? `${fieldId}-error` : undefined

  const describedBy = [helpId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className={cn('space-y-1.5', className)}>
      <label htmlFor={fieldId} className="block text-sm font-medium">
        {label}
        {required && (
          <span className="text-destructive ml-1" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {React.cloneElement(children as React.ReactElement<any>, {
        id: fieldId,
        name,
        required,
        'aria-describedby': describedBy,
        'aria-invalid': !!errorMessage,
      })}

      {helpText && (
        <p id={helpId} className="text-sm text-muted-foreground">
          {helpText}
        </p>
      )}

      {errorMessage && (
        <p id={errorId} role="alert" className="text-sm text-destructive">
          {errorMessage}
        </p>
      )}
    </div>
  )
}