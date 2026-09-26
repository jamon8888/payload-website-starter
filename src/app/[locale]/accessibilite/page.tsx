import { Metadata } from 'next'
import React from 'react'
import { notFound } from 'next/navigation'

import { getCachedGlobal } from '@/utilities/getGlobals'
import { Locale } from '@/i18n/config'
import { cn } from '@/utilities/ui'

interface AccessibilityStatementPageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: AccessibilityStatementPageProps): Promise<Metadata> {
  const { locale } = await params
  return {
    title: {
      en: 'Accessibility Statement',
      es: 'Declaración de accesibilidad',
      fr: 'Déclaration d\'accessibilité',
    }[locale] || 'Accessibility Statement',
  }
}

export default async function AccessibilityStatementPage({ params }: AccessibilityStatementPageProps) {
  const { locale } = await params

  const statement = await getCachedGlobal('accessibility-statement', locale, 1)()

  if (!statement) {
    notFound()
  }

  const { auditDate, referentielVersion, globalComplianceRate, nonConformCriteria, contactEmail, schemaPluriannuelUrl, planActionAnnuelUrl } = statement

  const formattedDate = auditDate ? new Date(auditDate).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : ''

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: {
      en: 'Accessibility Statement',
      es: 'Declaración de accesibilidad',
      fr: 'Déclaration d\'accessibilité',
    }[locale] || 'Accessibility Statement',
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
          <h1 className="text-3xl font-bold mb-4">
            {{
              en: 'Accessibility Statement',
              es: 'Declaración de accesibilidad',
              fr: 'Déclaration d\'accessibilité',
            }[locale] || 'Accessibility Statement'}
          </h1>
          <p className="text-muted-foreground">
            {{
              en: 'This accessibility statement applies to this website.',
              es: 'Esta declaración de accesibilidad se aplica a este sitio web.',
              fr: 'Cette déclaration d\'accessibilité s\'applique à ce site web.',
            }[locale]}
          </p>
        </header>

        <section aria-labelledby="compliance-status" className="mb-12">
          <h2 id="compliance-status" className="text-2xl font-semibold mb-4">
            {{
              en: 'Compliance Status',
              es: 'Estado de cumplimiento',
              fr: 'État de conformité',
            }[locale]}
          </h2>
          <dl className="space-y-4">
            <div>
              <dt className="font-medium">
                {{
                  en: 'Reference Standard',
                  es: 'Estándar de referencia',
                  fr: 'Référentiel',
                }[locale]}
              </dt>
              <dd>{referentielVersion}</dd>
            </div>
            <div>
              <dt className="font-medium">
                {{
                  en: 'Audit Date',
                  es: 'Fecha de auditoría',
                  fr: 'Date d\'audit',
                }[locale]}
              </dt>
              <dd>{formattedDate}</dd>
            </div>
            <div>
              <dt className="font-medium">
                {{
                  en: 'Global Compliance Rate',
                  es: 'Tasa de cumplimiento global',
                  fr: 'Taux de conformité global',
                }[locale]}
              </dt>
              <dd className={cn('font-mono text-2xl', globalComplianceRate >= 100 ? 'text-green-600' : globalComplianceRate >= 50 ? 'text-yellow-600' : 'text-red-600')}>
                {globalComplianceRate}%
              </dd>
            </div>
            <div>
              <dt className="font-medium">
                {{
                  en: 'Status',
                  es: 'Estado',
                  fr: 'Statut',
                }[locale]}
              </dt>
              <dd>
                {globalComplianceRate >= 100 ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {{
                      en: 'Fully Compliant',
                      es: 'Totalmente conforme',
                      fr: 'Totalement conforme',
                    }[locale]}
                  </span>
                ) : globalComplianceRate >= 50 ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                    {{
                      en: 'Partially Compliant',
                      es: 'Parcialmente conforme',
                      fr: 'Partiellement conforme',
                    }[locale]}
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                    {{
                      en: 'Non-Compliant',
                      es: 'No conforme',
                      fr: 'Non conforme',
                    }[locale]}
                  </span>
                )}
              </dd>
            </div>
          </dl>
        </section>

        {nonConformCriteria && nonConformCriteria.length > 0 && (
          <section aria-labelledby="non-conform" className="mb-12">
            <h2 id="non-conform" className="text-2xl font-semibold mb-4">
              {{
                en: 'Non-Conformant Criteria',
                es: 'Criterios no conformes',
                fr: 'Critères non conformes',
              }[locale]}
            </h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="text-left p-4 font-medium">
                    {{
                      en: 'Criterion',
                      es: 'Criterio',
                      fr: 'Critère',
                    }[locale]}
                  </th>
                  <th scope="col" className="text-left p-4 font-medium">
                    {{
                      en: 'Thematic',
                      es: 'Temática',
                      fr: 'Thématique',
                    }[locale]}
                  </th>
                  <th scope="col" className="text-left p-4 font-medium">
                    {{
                      en: 'Derogation',
                      es: 'Exención',
                      fr: 'Dérogation',
                    }[locale]}
                  </th>
                  <th scope="col" className="text-left p-4 font-medium">
                    {{
                      en: 'Justification',
                      es: 'Justificación',
                      fr: 'Justification',
                    }[locale]}
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
                          {{
                            en: 'Yes (disproportionate burden)',
                            es: 'Sí (carga desproporcionada)',
                            fr: 'Oui (charge disproportionnée)',
                          }[locale]}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">
                          {{
                            en: 'No',
                            es: 'No',
                            fr: 'Non',
                          }[locale]}
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      {criterion.justification?.[locale] || criterion.justification || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        <section aria-labelledby="contact" className="mb-12">
          <h2 id="contact" className="text-2xl font-semibold mb-4">
            {{
              en: 'Contact & Feedback',
              es: 'Contacto y comentarios',
              fr: 'Contact et retours',
            }[locale]}
          </h2>
          <p className="mb-4">
            {{
              en: 'If you encounter accessibility barriers on this site, or need information in an alternative format, please contact us:',
              es: 'Si encuentra barreras de accesibilidad en este sitio, o necesita información en un formato alternativo, contáctenos:',
              fr: 'Si vous rencontrez des obstacles d\'accessibilité sur ce site, ou avez besoin d\'informations dans un format alternatif, veuillez nous contacter :',
            }[locale]}
          </p>
          <address className="not-italic">
            <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">
              {contactEmail}
            </a>
          </address>
        </section>

        {(schemaPluriannuelUrl || planActionAnnuelUrl) && (
          <section aria-labelledby="documents" className="mb-12">
            <h2 id="documents" className="text-2xl font-semibold mb-4">
              {{
                en: 'Related Documents',
                es: 'Documentos relacionados',
                fr: 'Documents associés',
              }[locale]}
            </h2>
            <ul className="space-y-2 list-disc list-inside">
              {schemaPluriannuelUrl && (
                <li>
                  <a href={schemaPluriannuelUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {{
                      en: 'Multiannual Accessibility Scheme (3 years)',
                      es: 'Plan plurianual de accesibilidad (3 años)',
                      fr: 'Schéma pluriannuel d\'accessibilité (3 ans)',
                    }[locale]}
                  </a>
                </li>
              )}
              {planActionAnnuelUrl && (
                <li>
                  <a href={planActionAnnuelUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {{
                      en: 'Annual Accessibility Action Plan',
                      es: 'Plan de acción anual de accesibilidad',
                      fr: 'Plan d\'action annuel d\'accessibilité',
                    }[locale]}
                  </a>
                </li>
              )}
            </ul>
          </section>
        )}

        <section aria-labelledby="technologies" className="mb-12">
          <h2 id="technologies" className="text-2xl font-semibold mb-4">
            {{
              en: 'Technologies Used',
              es: 'Tecnologías utilizadas',
              fr: 'Technologies utilisées',
            }[locale]}
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
            {{
              en: 'Test Environment',
              es: 'Entorno de prueba',
              fr: 'Environnement de test',
            }[locale]}
          </h2>
          <p>
            {{
              en: 'This statement was established based on automated and manual testing using the following tools:',
              es: 'Esta declaración se estableció basándose en pruebas automatizadas y manuales utilizando las siguientes herramientas:',
              fr: 'Cette déclaration a été établie sur la base de tests automatisés et manuels utilisant les outils suivants :',
            }[locale]}
          </p>
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