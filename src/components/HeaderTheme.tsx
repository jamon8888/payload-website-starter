'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

/**
 * Forces the colour scheme of the header while the page is displayed — the
 * header sits on top of the hero, which can be light or dark.
 */
export const HeaderTheme: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme(theme)
  }, [setHeaderTheme, theme])

  return <React.Fragment />
}
