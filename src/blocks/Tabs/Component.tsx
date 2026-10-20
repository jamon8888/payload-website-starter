'use client'

import React, { useState } from 'react'

import RichText from '@/components/RichText'
import { Tabs as A11yTabs, TabsContent, TabsList, TabsTrigger } from '@/components/a11y'

import type { TabsBlock as TabsBlockProps } from '@/payload-types'

type Props = TabsBlockProps & {
  className?: string
}

export const TabsBlock: React.FC<Props> = ({ className, items }) => {
  const tabs = items || []
  const [activeTab, setActiveTab] = useState(tabs[0] ? 'tab-0' : '')

  if (!tabs.length) return null

  return (
    <A11yTabs className={className} onValueChange={setActiveTab} value={activeTab}>
      <TabsList>
        {tabs.map((tab, index) => (
          <TabsTrigger key={index} value={`tab-${index}`}>
            {tab?.label || ''}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab, index) => (
        <TabsContent key={index} value={`tab-${index}`}>
          {tab?.content ? <RichText data={tab.content} enableGutter={false} /> : null}
        </TabsContent>
      ))}
    </A11yTabs>
  )
}
