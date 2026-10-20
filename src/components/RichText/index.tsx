import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'

import type {
  AccordionBlock as AccordionBlockProps,
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  CodeBlock as CodeBlockFields,
  DataTableBlock as DataTableBlockProps,
  EmbedBlock as EmbedBlockProps,
  HowToBlock as HowToBlockProps,
  MediaBlock as MediaBlockProps,
  ModalBlock as ModalBlockProps,
  TabsBlock as TabsBlockProps,
  VideoBlock as VideoBlockProps,
} from '@/payload-types'
import { AccordionBlock } from '@/blocks/Accordion/Component'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { DataTableBlock } from '@/blocks/DataTable/Component'
import { EmbedBlock } from '@/blocks/Embed/Component'
import { HowToBlock } from '@/blocks/HowTo/Component'
import { ModalBlock } from '@/blocks/ModalBlock/Component'
import { TabsBlock } from '@/blocks/Tabs/Component'
import { VideoBlock } from '@/blocks/Video/Component'
import { cn } from '@/utilities/ui'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      | AccordionBlockProps
      | BannerBlockProps
      | CTABlockProps
      | CodeBlockFields
      | DataTableBlockProps
      | EmbedBlockProps
      | HowToBlockProps
      | MediaBlockProps
      | ModalBlockProps
      | TabsBlockProps
      | VideoBlockProps
    >

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    accordion: ({ node }) => (
      <AccordionBlock {...(node.fields as unknown as AccordionBlockProps)} />
    ),
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    code: ({ node }) => (
      <CodeBlock className="col-start-2" {...(node.fields as unknown as CodeBlockProps)} />
    ),
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
    dataTable: ({ node }) => (
      <DataTableBlock {...(node.fields as unknown as DataTableBlockProps)} />
    ),
    embed: ({ node }) => <EmbedBlock {...(node.fields as unknown as EmbedBlockProps)} />,
    howTo: ({ node }) => <HowToBlock {...(node.fields as unknown as HowToBlockProps)} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    modal: ({ node }) => <ModalBlock {...(node.fields as unknown as ModalBlockProps)} />,
    tabs: ({ node }) => <TabsBlock {...(node.fields as unknown as TabsBlockProps)} />,
    video: ({ node }) => <VideoBlock {...(node.fields as unknown as VideoBlockProps)} />,
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
