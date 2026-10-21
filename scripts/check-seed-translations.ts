import { home } from '../src/endpoints/seed/home'
import { post1 } from '../src/endpoints/seed/post-1'
import { post2 } from '../src/endpoints/seed/post-2'
import { post3 } from '../src/endpoints/seed/post-3'
import { contact } from '../src/endpoints/seed/contact-page'
import { contactForm } from '../src/endpoints/seed/contact-form'
import { seedDictionaries } from '../src/endpoints/seed/copy'

const fakeMedia = { id: 1, alt: 'ALT' } as never
const fakeAuthor = { id: 1 } as never
const fakeForm = { id: 1 } as never

const docs: Array<unknown> = [
  home({ heroImage: fakeMedia, metaImage: fakeMedia }),
  post1({ heroImage: fakeMedia, blockImage: fakeMedia, author: fakeAuthor }),
  post2({ heroImage: fakeMedia, blockImage: fakeMedia, author: fakeAuthor }),
  post3({ heroImage: fakeMedia, blockImage: fakeMedia, author: fakeAuthor }),
  contact({ contactForm: fakeForm }),
  contactForm,
]

const strings = new Set<string>()

const collect = (node: unknown): void => {
  if (Array.isArray(node)) {
    node.forEach(collect)
    return
  }
  if (!node || typeof node !== 'object') return

  for (const [key, value] of Object.entries(node)) {
    if (
      typeof value === 'string' &&
      value.trim().length > 1 &&
      [
        'text',
        'label',
        'title',
        'description',
        'alt',
        'aeoSummary',
        'question',
        'answer',
        'submitButtonLabel',
        'subject',
      ].includes(
        key,
      )
    ) {
      strings.add(value)
      continue
    }

    collect(value)
  }
}

docs.forEach(collect)

// 'ALT' vient du média factice du script de vérification, pas du contenu seedé
const all = [...strings].filter((value) => value !== 'ALT').sort()
let failed = false

for (const locale of ['fr', 'de', 'es'] as const) {
  const dictionary = seedDictionaries[locale]
  const missing = all.filter((value) => dictionary[value] === undefined)

  console.log(`\n${locale}: ${all.length - missing.length}/${all.length} chaînes traduites`)

  if (missing.length) {
    failed = true
    missing.forEach((value) => console.log(`  MANQUE: ${JSON.stringify(value)}`))
  }
}

const unused = Object.entries(seedDictionaries).flatMap(([locale, dictionary]) =>
  Object.keys(dictionary)
    .filter((key) => !strings.has(key))
    .map((key) => `${locale}: ${key}`),
)

if (unused.length) {
  console.log('\nEntrées de dictionnaire inutilisées :')
  unused.forEach((entry) => console.log(`  ${entry}`))
}

process.exit(failed ? 1 : 0)
