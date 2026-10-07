import { Metadata } from 'next'
import React from 'react'
import { notFound } from 'next/navigation'

import { getCachedGlobal } from '@/utilities/getGlobals'
import { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionary'
import { cn } from '@/utilities/ui'

interface AccessibilityStatementPageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: AccessibilityStatementPageProps): Promise<Metadata> {
  const { locale } = await params
  const { accessibility } = await getDictionary(locale)

  return {
    title: accessibility.metaTitle,
  }
}

export default async function AccessibilityStatementPage({ params }: AccessibilityStatementPageProps) {
  const { locale } = await params
  const { accessibility: a } = await getDictionary(locale)

  const statement = await getCachedGlobal('accessibility-statement', locale, 1)()

  if (!statement) {
    notFound()
  }

  const { auditDate, referentielVersion, globalComplianceRate, nonConformCriteria, contactEmail, schemaPluriannuelUrl, planActionAnnuelUrl } = statement

  const formattedDate = auditDate
    ? new Date(auditDate).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: a.metaTitle,
    datePublished: auditDate,
    dateModified: auditDate,
    accessibilitySummary: {
      '@type': 'StructuredValue',
      conformanceLevel: globalComplianceRate >= 100 ? 'full' : 'partial',
      complianceRate: globalComplianceRate,
      referentielVersion,
      auditDate,
      contactEmail,
      nonConformantCriteria: nonConformCriteria?.map((c: any) => ({
        criterion: c.criterion,
        thematic: c.thematic,
        derogation: c.derogation,
        justification: c.justification,
      })),
      schemaPluriannuelUrl,
      planActionAnnuelUrl,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main-content" className="container py-12">
        <header className="mb-12">
          <h1 className="text-3xl font-bold mb-4">{a.title}</h1>
          <p className="text-muted-foreground">{a.intro}</p>
        </header>

        <section aria-labelledby="compliance-status" className="mb-12">
          <h2 id="compliance-status" className="text-2xl font-semibold mb-4">
            {a.complianceStatus}
          </h2>
          <dl className="space-y-4">
            <div>
              <dt className="font-medium">{a.referenceStandard}</dt>
              <dd>{referentielVersion}</dd>
            </div>
            <div>
              <dt className="font-medium">{a.auditDate}</dt>
              <dd>{formattedDate}</dd>
            </div>
            <div>
              <dt className="font-medium">{a.globalComplianceRate}</dt>
              <dd
                className={cn(
                  'font-mono text-2xl',
                  globalComplianceRate >= 100
                    ? 'text-green-600'
                    : globalComplianceRate >= 50
                      ? 'text-yellow-600'
                      : 'text-red-600',
                )}
              >
                {globalComplianceRate}%
              </dd>
            </div>
            <div>
              <dt className="font-medium">{a.status}</dt>
              <dd>
                {globalComplianceRate >= 100 ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {a.fullyCompliant}
                  </span>
                ) : globalComplianceRate >= 50 ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                    {a.partiallyCompliant}
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                    {a.nonCompliant}
                  </span>
                )}
              </dd>
            </div>
          </dl>
        </section>

        {nonConformCriteria && nonConformCriteria.length > 0 && (
          <section aria-labelledby="non-conform" className="mb-12">
            <h2 id="non-conform" className="text-2xl font-semibold mb-4">
              {a.nonConformantCriteria}
            </h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="text-left p-4 font-medium">
                    {a.criterion}
                  </th>
                  <th scope="col" className="text-left p-4 font-medium">
                    {a.thematic}
                  </th>
                  <th scope="col" className="text-left p-4 font-medium">
                    {a.derogation}
                  </th>
                  <th scope="col" className="text-left p-4 font-medium">
                    {a.justification}
                  </th>
                </tr>
              </thead>
              <tbody>
                {nonConformCriteria.map((criterion: any, index: number) => (
                  <tr key={index} className="border-b border-border">
                    <td className="p-4 font-mono">{criterion.criterion}</td>
                    <td className="p-4">{criterion.thematic}</td>
                    <td className="p-4">
                      {criterion.derogation ? (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {a.derogationYes}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">{a.derogationNo}</span>
                      )}
                    </td>
                    <td className="p-4">{criterion.justification || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        <section aria-labelledby="contact" className="mb-12">
          <h2 id="contact" className="text-2xl font-semibold mb-4">
            {a.contactAndFeedback}
          </h2>
          <p className="mb-4">{a.contactIntro}</p>
          <address className="not-italic">
            <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">
              {contactEmail}
            </a>
          </address>
        </section>

        {(schemaPluriannuelUrl || planActionAnnuelUrl) && (
          <section aria-labelledby="documents" className="mb-12">
            <h2 id="documents" className="text-2xl font-semibold mb-4">
              {a.relatedDocuments}
            </h2>
            <ul className="space-y-2 list-disc list-inside">
              {schemaPluriannuelUrl && (
                <li>
                  <a
                    href={schemaPluriannuelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {a.multiannualScheme}
                  </a>
                </li>
              )}
              {planActionAnnuelUrl && (
                <li>
                  <a
                    href={planActionAnnuelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {a.annualActionPlan}
                  </a>
                </li>
              )}
            </ul>
          </section>
        )}

        <section aria-labelledby="technologies" className="mb-12">
          <h2 id="technologies" className="text-2xl font-semibold mb-4">
            {a.technologiesUsed}
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>HTML5 / CSS3 / JavaScript (TypeScript)</li>
            <li>Next.js 16 (App Router, Server Components)</li>
            <li>Payload CMS (Headless CMS)</li>
            <li>Tailwind CSS (Design System)</li>
            <li>Radix UI (Accessible Primitives)</li>
          </ul>
        </section>

        <section aria-labelledby="environment" className="mb-12">
          <h2 id="environment" className="text-2xl font-semibold mb-4">
            {a.testEnvironment}
          </h2>
          <p>{a.testEnvironmentIntro}</p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>axe-core (WCAG 2.1 AA)</li>
            <li>pa11y (WCAG 2.1 AA)</li>
            <li>Lighthouse (Accessibility, SEO, Best Practices)</li>
            <li>Screen readers: NVDA, VoiceOver</li>
            <li>Keyboard-only navigation testing</li>
            <li>Zoom up to 200% / 400%</li>
          </ul>
        </section>
      </main>
    </>
  )
}