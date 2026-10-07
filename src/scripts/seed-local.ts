import 'dotenv/config'

import type { RequiredDataFromCollectionSlug } from 'payload'

import { createLocalReq, getPayload } from 'payload'

import config from '../payload.config'

type PostContent = RequiredDataFromCollectionSlug<'posts'>['content']

// Minimal, media-free seed used to exercise the frontend routes locally and in CI.
// The full `seed` helper uploads demo images to Vercel Blob, which is not
// available with a local placeholder token.
const richText = (text: string): PostContent => ({
  root: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [
          { type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
})

const run = async () => {
  const payload = await getPayload({ config })

  const existing = await payload.find({
    collection: 'users',
    limit: 1,
    where: { email: { equals: 'seed-script@example.com' } },
  })

  const user =
    existing.docs[0] ??
    (await payload.create({
      collection: 'users',
      data: {
        email: 'seed-script@example.com',
        name: 'Seed Script',
        password: 'password',
      },
    }))

  const req = await createLocalReq({ user }, payload)

  await payload.db.deleteMany({ collection: 'posts', req, where: {} })
  await payload.db.deleteVersions({ collection: 'posts', req, where: {} })

  const locales = ['en', 'de', 'fr', 'es'] as const

  const titleFor = (locale: (typeof locales)[number]) => `Digital Horizons (${locale})`
  const summaryFor = (locale: (typeof locales)[number]) =>
    locale === 'fr'
      ? 'Un résumé court, rédigé par l’éditrice, destiné aux moteurs de réponse.'
      : `A short, editor-authored answer summary for answer engines (${locale}).`

  const post = await payload.create({
    collection: 'posts',
    locale: 'en',
    draft: false,
    context: { disableRevalidate: true },
    data: {
      slug: 'digital-horizons',
      title: titleFor('en'),
      _status: 'published',
      content: richText('A paragraph of seeded content used to exercise the frontend routes.'),
      aeo: {
        aeoSummary: summaryFor('en'),
        answerBlocks: [
          {
            question: 'What are digital horizons?',
            answer: 'They are the shifting edges of what technology makes possible.',
          },
        ],
      },
    },
  })

  // titles and summaries differ per locale, so write them one locale at a time
  for (const locale of locales.filter((l) => l !== 'en')) {
    await payload.update({
      id: post.id,
      collection: 'posts',
      locale,
      draft: false,
      context: { disableRevalidate: true },
      data: {
        title: titleFor(locale),
        _status: 'published',
        content: richText(
          `A paragraph of seeded content used to exercise the frontend routes (${locale}).`,
        ),
        aeo: { aeoSummary: summaryFor(locale) },
      },
    })
  }

  await payload.updateGlobal({
    slug: 'accessibility-statement',
    context: { disableRevalidate: true },
    data: {
      auditDate: new Date().toISOString(),
      referentielVersion: 'RGAA 4.1.2',
      globalComplianceRate: 96,
      contactEmail: 'accessibility@example.com',
      nonConformCriteria: [
        {
          criterion: '1.1.1',
          thematic: 'Images',
          derogation: true,
          justification: 'Waiting for the CMS upgrade that exposes image alternatives inline.',
        },
      ],
    },
  })

  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
