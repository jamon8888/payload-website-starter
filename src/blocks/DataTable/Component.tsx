import React from 'react'

import { AccessibleDataTable } from '@/components/a11y'

import type { DataTableBlock as DataTableBlockProps } from '@/payload-types'

type Props = DataTableBlockProps & {
  className?: string
}

export const DataTableBlock: React.FC<Props> = ({ caption, className, header, rows }) => {
  const headerCells = (header || []).map((column) => column?.cell || '')

  const tableRows = (rows || []).map((row) =>
    (row?.cells || []).map((cell) => cell?.cell || ''),
  )

  return (
    <AccessibleDataTable
      className={className}
      dataTable={{ caption: caption || '', header: headerCells, rows: tableRows }}
    />
  )
}
