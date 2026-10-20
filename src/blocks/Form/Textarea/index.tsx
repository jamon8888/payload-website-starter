import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Textarea as TextAreaComponent } from '@/components/ui/textarea'
import React from 'react'

import { FormField } from '@/components/a11y'
import { Width } from '../Width'

export const Textarea: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
    rows?: number
  }
> = ({ name, defaultValue, errors, label, register, required, rows = 3, width }) => {
  return (
    <Width width={width}>
      <FormField
        errorMessage={errors[name]?.message as string}
        label={label}
        name={name}
        required={required}
      >
        <TextAreaComponent defaultValue={defaultValue} rows={rows} {...register(name, { required })} />
      </FormField>
    </Width>
  )
}
