import type { FieldErrorsImpl } from 'react-hook-form'

/**
 * ARIA wiring for the form-builder fields that keep their own layout (select,
 * checkbox, country, state): the input is flagged as invalid and points at the
 * error message, which is rendered with `role="alert"` by the shared Error
 * component.
 */
export const fieldAriaProps = (
  name: string,
  errors?: Partial<FieldErrorsImpl>,
): {
  'aria-invalid'?: true
  'aria-describedby'?: string
} => {
  const hasError = Boolean(errors?.[name])

  if (!hasError) return {}

  return {
    'aria-invalid': true,
    'aria-describedby': `${name}-error`,
  }
}
