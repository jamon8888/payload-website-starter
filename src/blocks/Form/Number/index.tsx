import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import React from 'react'

import { FormField } from '@/components/a11y'
import { Width } from '../Width'

export const Number: React.FC<
  TextField & {
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
          type="number"
          {...register(name, { required })}
        />
      </FormField>
    </Width>
  )
}
