'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState, useEffect } from 'react'
import { useDebounce } from '@/utilities/useDebounce'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { defaultLocale } from '@/i18n/config'

export const Search: React.FC = () => {
  const [value, setValue] = useState('')
  const router = useRouter()
  const t = useTranslations('search')
  const locale = useLocale()

  const debouncedValue = useDebounce(value)

  useEffect(() => {
    // Keep the current locale: searching from /fr/search must stay on the
    // French index, not fall back to the unprefixed route.
    const prefix = locale === defaultLocale ? '' : `/${locale}`

    router.push(`${prefix}/search${debouncedValue ? `?q=${debouncedValue}` : ''}`)
  }, [debouncedValue, locale, router])

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <Label htmlFor="search" className="sr-only">
          {t('label')}
        </Label>
        <Input
          id="search"
          onChange={(event) => {
            setValue(event.target.value)
          }}
          placeholder={t('placeholder')}
        />
        <button type="submit" className="sr-only">
          {t('label')}
        </button>
      </form>
    </div>
  )
}
