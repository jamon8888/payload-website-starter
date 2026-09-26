import type { TextFieldSingleValidation } from 'payload'
import {
  BoldFeature,
  HeadingFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  lexicalEditor,
  type LinkFields,
} from '@payloadcms/richtext-lexical'

export const defaultLexical = lexicalEditor({
  features: [
    ParagraphFeature(),
    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
    BoldFeature(),
    ItalicFeature(),
    LinkFeature({
      enabledCollections: ['pages', 'posts'],
      fields: ({ defaultFields }) => {
        const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
          if ('name' in field && field.name === 'url') return false
          return true
        })

        return [
          ...defaultFieldsWithoutUrl,
          {
            name: 'url',
            type: 'text',
            admin: {
              condition: (_data, siblingData) => siblingData?.linkType !== 'internal',
            },
            label: ({ t }) => t('fields:enterURL'),
            required: true,
            validate: ((value, options) => {
              if ((options?.siblingData as LinkFields)?.linkType === 'internal') {
                return true
              }
              return value ? true : 'URL is required'
            }) as TextFieldSingleValidation,
          },
        ]
      },
    }),
  ],
})

// Heading hierarchy validation hook for use in collections/blocks
// Validates that heading levels don't skip (e.g., h2 -> h4 without h3)
export const validateHeadingHierarchy = (value: any) => {
  if (!value?.root?.children) return true

  const headings: Array<{ level: number; text: string }> = []

  const traverse = (nodes: any[]) => {
    for (const node of nodes) {
      if (node.type === 'heading' && node.tag) {
        const level = parseInt(node.tag.replace('h', ''), 10)
        if (!isNaN(level)) {
          headings.push({ level, text: node.children?.map((c: any) => c.text).join('') || '' })
        }
      }
      if (node.children) {
        traverse(node.children)
      }
    }
  }

  traverse(value.root.children)

  let previousLevel = 0
  for (const heading of headings) {
    if (previousLevel > 0 && heading.level > previousLevel + 1) {
      return `Hiérarchie de titres invalide : saut de niveau détecté (ex: h${previousLevel} → h${heading.level} sans h${previousLevel + 1} intermédiaire) — RGAA 9.1`
    }
    previousLevel = heading.level
  }

  return true
}