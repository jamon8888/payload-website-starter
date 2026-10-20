import React from 'react'

interface AccessibleDataTableProps {
  dataTable: {
    caption: string
    header: string[]
    rows: string[][]
  } | null
  className?: string
}

export const AccessibleDataTable: React.FC<AccessibleDataTableProps> = ({
  dataTable,
  className,
}) => {
  if (!dataTable) return null

  const { caption, header, rows } = dataTable

  return (
    <div className={className}>
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            {header.map((cell, index) => (
              <th key={index} scope="col">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
