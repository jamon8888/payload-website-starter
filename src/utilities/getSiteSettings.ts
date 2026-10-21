import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

import type { Media } from '@/payload-types'
import type { Locale } from '@/i18n/config'
import { defaultThemeTokens, type ThemeTokens } from '@/theme/tokens'

export interface SiteSettings {
  brandName: string
  logo: number | Media | null
  theme: ThemeTokens
  seo: {
    titleTemplate: string
    defaultDescription: string
    ogImage: number | Media | null
    twitterHandle: string
  }
}

const FALLBACK_BRAND_NAME = 'Payload Website'

/**
 * The customizer values, with the defaults applied so a global that was never
 * filled in still renders a sane site.
 */
export const getSiteSettings = unstable_cache(
  async (locale: Locale): Promise<SiteSettings> => {
    const payload = await getPayload({ config: configPromise })

    const settings = await payload.findGlobal({
      slug: 'site-settings',
      locale: locale as 'en' | 'de' | 'fr' | 'es' | 'all',
      fallbackLocale: 'en',
      depth: 1,
    })

    return {
      brandName: settings?.brandName || FALLBACK_BRAND_NAME,
      logo: settings?.logo ?? null,
      theme: {
        primaryColor: settings?.theme?.primaryColor || defaultThemeTokens.primaryColor,
        primaryForeground:
          settings?.theme?.primaryForeground || defaultThemeTokens.primaryForeground,
        radius: settings?.theme?.radius || defaultThemeTokens.radius,
        fontFamily: settings?.theme?.fontFamily || defaultThemeTokens.fontFamily,
        defaultTheme: settings?.theme?.defaultTheme || defaultThemeTokens.defaultTheme,
      },
      seo: {
        titleTemplate: settings?.seo?.titleTemplate || '%s | {site}',
        defaultDescription: settings?.seo?.defaultDescription || '',
        ogImage: settings?.seo?.ogImage ?? null,
        twitterHandle: settings?.seo?.twitterHandle || '',
      },
    }
  },
  ['site-settings'],
  { tags: ['global_site-settings'] },
)
