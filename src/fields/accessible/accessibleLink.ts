import type { Field, GroupField } from 'payload'

import { link, type LinkAppearances } from '@/fields/link'

export const accessibleLink = ({
  appearances,
  disableLabel = false,
  overrides = {},
}: {
  appearances?: LinkAppearances[] | false
  disableLabel?: boolean
  overrides?: Partial<GroupField>
} = {}): Field => {
  // The base link function now includes RGAA validation for generic labels
  return link({ appearances, disableLabel, overrides })
}