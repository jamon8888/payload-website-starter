import type { EmailField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import React from 'react'

import { FormField } from '@/components/a11y'
import { Width } from '../Width'

export const Email: React.FC<
  EmailField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
  return (
    <Width width={width}>
      <FormField
        errorMessage={errors[name]?.message as string}
        label={label}
        name={name}
        required={required}
      >
        <Input
          defaultValue={defaultValue}
          type="email"
          {...register(name, { pattern: /^\S[^\s@]*@\S+$/, required })}
        />
      </FormField>
    </Width>
  )
}
