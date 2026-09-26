import React from 'react'

interface AccessibleDataTableProps {
  dataTable: {
    caption: string
    headerRow: Array<{ cell: string }>
    rows: Array<{ cells: Array<{ cell: string }> }>
  } | null
  className?: string
}

export const AccessibleDataTable: React.FC<AccessibleDataTableProps> = ({
  dataTable,
  className,
}) => {
  if (!dataTable) return null

  const { caption, headerRow, rows } = dataTable

  return (
    <div className={className}>
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            {headerRow.map((header, index) => (
              <th key={index} scope="col">
                {header.cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.cells.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell.cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}