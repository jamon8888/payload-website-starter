import React from 'react'

interface PageRangeProps {
  className?: string
  collection?: 'posts'
  currentPage?: number
  limit?: number
  totalDocs?: number
}

export const PageRange: React.FC<PageRangeProps> = (props) => {
  const {
    className,
    collection,
    currentPage,
    limit,
    totalDocs,
  } = props

  let indexStart = (currentPage ? currentPage - 1 : 1) * (limit || 1) + 1
  if (totalDocs && indexStart > totalDocs) indexStart = 0

  let indexEnd = (currentPage || 1) * (limit || 1)
  if (totalDocs && indexEnd > totalDocs) indexEnd = totalDocs

  const labels = collection === 'posts'
    ? { plural: 'Posts', singular: 'Post' }
    : { plural: 'Docs', singular: 'Doc' }

  return (
    <div className={[className, 'font-semibold'].filter(Boolean).join(' ')}>
      {(typeof totalDocs === 'undefined' || totalDocs === 0) && `Search produced no results.`}
      {typeof totalDocs !== 'undefined' &&
        totalDocs > 0 &&
        `Showing ${indexStart}${indexStart > 0 ? ` - ${indexEnd}` : ''} of ${totalDocs} ${
          totalDocs > 1 ? labels.plural : labels.singular
        }`}
    </div>
  )
}
