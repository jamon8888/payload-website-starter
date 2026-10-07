import React from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import { ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface BreadcrumbItem {
  label: string
  href?: string
  locale?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  className,
}) => {
  const t = useTranslations('a11y')

  return (
    <nav
      aria-label={t('breadcrumb')}
      className={cn('flex items-center space-x-2 text-sm', className)}
    >
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const isFirst = index === 0

          return (
            <li key={index} className="flex items-center">
              {!isFirst && (
                <ChevronRight
                  className="h-4 w-4 text-muted-foreground mx-2 shrink-0"
                  aria-hidden="true"
                />
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    isLast ? 'text-foreground font-medium' : 'text-muted-foreground'
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}