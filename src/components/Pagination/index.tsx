'use client'
import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { cn } from '@/utilities/ui'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Locale } from '@/i18n/config'
import { useTranslations } from 'next-intl'

export const Pagination: React.FC<{
  className?: string
  page: number
  totalPages: number
  locale?: Locale
}> = (props) => {
  const router = useRouter()
  const t = useTranslations('pagination')

  const { className, page, totalPages, locale = 'en' } = props
  const localePrefix = locale === 'en' ? '' : `/${locale}`
  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1

  const hasExtraPrevPages = page - 1 > 1
  const hasExtraNextPages = page + 1 < totalPages

  const labels = {
    ariaLabel: t('ariaLabel'),
    previous: t('previous'),
    previousAriaLabel: t('goToPreviousPage'),
    next: t('next'),
    nextAriaLabel: t('goToNextPage'),
    morePages: t('morePages'),
  }

  return (
    <div className={cn('my-12', className)}>
      <PaginationComponent labels={labels}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              labels={labels}
              disabled={!hasPrevPage}
              onClick={() => {
                router.push(`${localePrefix}/posts/page/${page - 1}`)
              }}
            />
          </PaginationItem>

          {hasExtraPrevPages && (
            <PaginationItem>
              <PaginationEllipsis labels={labels} />
            </PaginationItem>
          )}

          {hasPrevPage && (
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  router.push(`${localePrefix}/posts/page/${page - 1}`)
                }}
              >
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink
              isActive
              onClick={() => {
                router.push(`${localePrefix}/posts/page/${page}`)
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>

          {hasNextPage && (
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  router.push(`${localePrefix}/posts/page/${page + 1}`)
                }}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {hasExtraNextPages && (
            <PaginationItem>
              <PaginationEllipsis labels={labels} />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              labels={labels}
              disabled={!hasNextPage}
              onClick={() => {
                router.push(`${localePrefix}/posts/page/${page + 1}`)
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </PaginationComponent>
    </div>
  )
}
