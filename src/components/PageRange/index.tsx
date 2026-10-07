import React from 'react'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/i18n/config'

interface PageRangeProps {
  className?: string
  collection?: 'posts'
  currentPage?: number
  limit?: number
  totalDocs?: number
  locale: Locale
}

export const PageRange: React.FC<PageRangeProps> = async (props) => {
  const {
    className,
    collection = 'posts',
    currentPage,
    limit,
    totalDocs,
    locale,
  } = props

  const t = await getTranslations({ locale, namespace: 'pageRange' })
  const tCollection = await getTranslations({ locale, namespace: 'posts' })

  let indexStart = (currentPage ? currentPage - 1 : 1) * (limit || 1) + 1
  if (totalDocs && indexStart > totalDocs) indexStart = 0

  let indexEnd = (currentPage || 1) * (limit || 1)
  if (totalDocs && indexEnd > totalDocs) indexEnd = totalDocs

  return (
    <div className={[className, 'font-semibold'].filter(Boolean).join(' ')}>
      {(typeof totalDocs === 'undefined' || totalDocs === 0) && t('noResults')}
      {typeof totalDocs !== 'undefined' &&
        totalDocs > 0 &&
        t('showing', {
          start: indexStart,
          end: indexEnd,
          total: totalDocs,
          type: collection === 'posts' ? tCollection('title') : '',
        })}
    </div>
  )
}