import { home } from '../src/endpoints/seed/home'
import { post1 } from '../src/endpoints/seed/post-1'
import { post2 } from '../src/endpoints/seed/post-2'
import { post3 } from '../src/endpoints/seed/post-3'
import { contact } from '../src/endpoints/seed/contact-page'
import { contactForm } from '../src/endpoints/seed/contact-form'

const fakeMedia = { id: 1, alt: 'ALT' } as never
const fakeAuthor = { id: 1 } as never
const fakeForm = { id: 1 } as never

const docs: Array<[string, unknown]> = [
  ['home', home({ heroImage: fakeMedia, metaImage: fakeMedia })],
  ['post1', post1({ heroImage: fakeMedia, blockImage: fakeMedia, author: fakeAuthor })],
  ['post2', post2({ heroImage: fakeMedia, blockImage: fakeMedia, author: fakeAuthor })],
  ['post3', post3({ heroImage: fakeMedia, blockImage: fakeMedia, author: fakeAuthor })],
  ['contact', contact({ contactForm: fakeForm })],
  ['contactForm', contactForm],
]

const strings = new Set<string>()

const collect = (node: unknown): void => {
  if (Array.isArray(node)) {
    node.forEach(collect)
    return
  }
  if (!node || typeof node !== 'object') return

  for (const [key, value] of Object.entries(node)) {
    if (typeof value === 'string' && value.trim().length > 1) {
      if (
        ['text', 'label', 'title', 'description', 'alt', 'aeoSummary', 'question', 'answer'].includes(
          key,
        )
      ) {
        strings.add(value)
      }
      continue
    }
    collect(value)
  }
}

docs.forEach(([, doc]) => collect(doc))

const list = [...strings].sort()

console.log(`// ${list.length} chaînes à traduire`)
console.log(JSON.stringify(list, null, 2))
