import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'
import { Locale } from '@/i18n/config'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { AccordionBlock } from '@/blocks/Accordion/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { DataTableBlock } from '@/blocks/DataTable/Component'
import { EmbedBlock } from '@/blocks/Embed/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { HowToBlock } from '@/blocks/HowTo/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { ModalBlock } from '@/blocks/ModalBlock/Component'
import { TabsBlock } from '@/blocks/Tabs/Component'
import { VideoBlock } from '@/blocks/Video/Component'

const blockComponents = {
  accordion: AccordionBlock,
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  dataTable: DataTableBlock,
  embed: EmbedBlock,
  formBlock: FormBlock,
  howTo: HowToBlock,
  mediaBlock: MediaBlock,
  modal: ModalBlock,
  tabs: TabsBlock,
  video: VideoBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
  locale?: Locale
}> = (props) => {
  const { blocks, locale = 'en' } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} locale={locale} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
