import type { Metadata } from 'next'

import React from 'react'
import { notFound } from 'next/navigation'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import RichText from '@/components/RichText'
import { getAccessibilityStatements } from '@/utilities/getAccessibilityStatements'
import { getDictionary } from '@/i18n/dictionary'
import { getServerSideURL } from '@/utilities/getURL'
import { localizedHref } from '@/i18n/path'
import type { Locale } from '@/i18n/config'

interface StatementPageProps {
  params: Promise<{ locale: Locale; slug: string }>
}

const statusLabel = (status: string | null | undefined, a: Record<string, string>) => {
  if (status === 'conformant') return a.fullyCompliant
  if (status === 'nonConformant') return a.nonCompliant
  return a.partiallyCompliant
}

export async function generateMetadata({ params }: StatementPageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const { accessibility } = await getDictionary(locale)

  const statements = await getAccessibilityStatements(locale)
  const statement = statements.find((doc) => doc.slug === slug)

  if (!statement) {
    return { title: accessibility.metaTitle }
  }

  return {
    title: statement.title,
    description: accessibility.intro,
    alternates: {
      canonical: `${getServerSideURL()}${localizedHref(locale, `accessibilite/${slug}`)}`,
    },
  }
}

export default async function StatementPage({ params }: StatementPageProps) {
  const { locale, slug } = await params
  const { accessibility: a } = await getDictionary(locale)

  const statements = await getAccessibilityStatements(locale)
  const statement = statements.find((doc) => doc.slug === slug)

  if (!statement) {
    notFound()
  }

  const {
    auditDate,
    contactEmail,
    globalComplianceRate,
    nonConformCriteria,
    referentielVersion,
    statement: statementContent,
  } = statement

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
    name: statement.title,
    datePublished: auditDate,
    dateModified: auditDate,
    accessibilitySummary: {
      '@type': 'StructuredValue',
      conformanceLevel: globalComplianceRate >= 100 ? 'full' : 'partial',
      complianceRate: globalComplianceRate,
      referentielVersion,
      auditDate,
      contactEmail,
      nonConformantCriteria: nonConformCriteria?.map((criterion) => ({
        criterion: criterion.criterion,
        thematic: criterion.thematic,
        derogation: criterion.derogation,
        justification: criterion.justification,
      })),
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
          <h1 className="text-3xl font-bold mb-4">{statement.title}</h1>
          <p className="text-muted-foreground">
            {a.status}: {statusLabel(statement.complianceStatus, a)}
          </p>
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
              <dd className="font-mono text-2xl">{globalComplianceRate}%</dd>
            </div>
          </dl>
        </section>

        {statementContent ? (
          <section aria-labelledby="statement" className="mb-12">
            <h2 id="statement" className="text-2xl font-semibold mb-4">
              {a.title}
            </h2>
            <RichText data={statementContent} />
          </section>
        ) : null}

        {nonConformCriteria && nonConformCriteria.length > 0 ? (
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
                {nonConformCriteria.map((criterion, index) => (
                  <tr key={index} className="border-b border-border">
                    <td className="p-4 font-mono">{criterion.criterion}</td>
                    <td className="p-4">{criterion.thematic}</td>
                    <td className="p-4">
                      {criterion.derogation ? a.derogationYes : a.derogationNo}
                    </td>
                    <td className="p-4">{criterion.justification || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ) : null}

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
      </main>
    </>
  )
}
