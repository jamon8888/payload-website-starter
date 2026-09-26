'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React, { useState, useSyncExternalStore } from 'react'

import type { Theme } from './types'

import { useTheme } from '..'
import { themeLocalStorageKey } from './types'

const subscribePreference = (onChange: () => void) => {
  window.addEventListener('storage', onChange)
  return () => window.removeEventListener('storage', onChange)
}

const readPreference = () => window.localStorage.getItem(themeLocalStorageKey) ?? 'auto'

const readPreferenceOnServer = () => 'auto'

export const ThemeSelector: React.FC = () => {
  const { setTheme } = useTheme()
  /* Preference is an external store: React renders the server snapshot during hydration,
     then re-renders with the client value, so there is no hydration mismatch. `value`
     only records a choice made in this tab (storage events do not fire in the tab that
     wrote them). */
  const [value, setValue] = useState<string | null>(null)
  const preference = useSyncExternalStore(
    subscribePreference,
    readPreference,
    readPreferenceOnServer,
  )

  const onThemeChange = (themeToSet: Theme & 'auto') => {
    if (themeToSet === 'auto') {
      setTheme(null)
      setValue('auto')
    } else {
      setTheme(themeToSet)
      setValue(themeToSet)
    }
  }

  return (
    <Select onValueChange={onThemeChange} value={value ?? preference}>
      <SelectTrigger
        aria-label="Select a theme"
        className="w-auto bg-transparent gap-2 pl-0 md:pl-3 border-none"
      >
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="auto">Auto</SelectItem>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
      </SelectContent>
    </Select>
  )
}
