'use client'

import React, { useEffect, useState } from 'react'

type Dashboard = {
  audit: { averageScore: number; documents: number; errors: number; warnings: number }
  citations: { confirmed: number; lost: number; total: number }
  performance: { averagePosition: number | null; clicks: number; impressions: number }
}

export const SeoBoostDashboard: React.FC = () => {
  const [data, setData] = useState<Dashboard | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    fetch('/api/seo-boost/dashboard')
      .then((response) => (response.ok ? (response.json() as Promise<Dashboard>) : Promise.reject()))
      .then(setData)
      .catch(() => setFailed(true))
  }, [])

  return (
    <section aria-labelledby="seo-boost-title" style={{ marginBlock: '1.5rem' }}>
      <h2 id="seo-boost-title">SEO Boost</h2>
      {failed && <p role="alert">The SEO Boost dashboard could not be loaded.</p>}
      {!data && !failed && <p>Loading editorial metrics…</p>}
      {data && (
        <dl style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))' }}>
          <div><dt>SEO health</dt><dd>{data.audit.averageScore}/100</dd></div>
          <div><dt>Content audited</dt><dd>{data.audit.documents}</dd></div>
          <div><dt>Search clicks</dt><dd>{data.performance.clicks}</dd></div>
          <div><dt>AI citations</dt><dd>{data.citations.confirmed} confirmed</dd></div>
        </dl>
      )}
    </section>
  )
}

export default SeoBoostDashboard
