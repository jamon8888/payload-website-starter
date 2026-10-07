import React from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import type { Page, Post } from '@/payload-types'
import { Locale } from '@/i18n/config'
import { useTranslations } from 'next-intl'

type CMSLinkType = {
  appearance?: 'inline' | 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary'
  children?: React.ReactNode
  className?: string
  label?: string | null
  locale?: Locale
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'clear' | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

export const AccessibleLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    locale = 'en',
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = props

  const t = useTranslations('a11y')
  const localePrefix = locale === 'en' ? '' : `/${locale}`

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${localePrefix}${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${reference.value.slug}`
      : url

  if (!href) return null

  const newTabProps = newTab
    ? { rel: 'noopener noreferrer', target: '_blank' as const }
    : {}

  // Inline link (from richText)
  if (appearance === 'inline') {
    return (
      <Link className={cn('underline-offset-4 hover:underline', className)} href={href} {...newTabProps}>
        {label}
        {children}
        {newTab && (
          <span className="sr-only"> {t('newWindow')}</span>
        )}
      </Link>
    )
  }

  // Button-style links
  const buttonVariants: Record<string, string> = {
    default: 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90',
    destructive: 'bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90',
    outline: 'border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
  }

  const sizeVariants: Record<string, string> = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'size-10',
    clear: '',
  }

  const variant = buttonVariants[appearance] || buttonVariants.default
  const size = sizeFromProps ? sizeVariants[sizeFromProps] : sizeVariants.default

  return (
    <Link className={cn('inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow]', variant, size, className)} href={href} {...newTabProps}>
      {label}
      {children}
      {newTab && <span className="sr-only"> {t('newWindow')}</span>}
    </Link>
  )
}