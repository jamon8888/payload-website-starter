import { test, expect, Page } from '@playwright/test'

const locales = ['en', 'fr', 'de', 'es'] as const

/** `/en` is served unprefixed, every other locale gets a prefix. */
const path = (locale: string, rest = '') => {
  const prefix = locale === 'en' ? '' : `/${locale}`
  return `http://localhost:3000${prefix}${rest}`
}

test.describe('Frontend', () => {
  let page: Page

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext()
    page = await context.newPage()
  })

  test('can load homepage', async ({ page }) => {
    await page.goto(path('en'))
    await expect(page).toHaveTitle(/Payload Website Template/)
    const heading = page.locator('h1').first()
    await expect(heading).toHaveText('Payload Website Template')
  })

  test.describe('locale routing', () => {
    test('serves the default locale unprefixed and keeps others prefixed', async ({ page }) => {
      for (const locale of locales) {
        const response = await page.goto(path(locale, '/posts'))

        expect(response?.status(), `${locale} /posts should render`).toBe(200)
      }
    })

    test('redirects the prefixed default locale to its canonical form', async ({ page }) => {
      await page.goto('http://localhost:3000/en/posts')

      await expect(page).toHaveURL(/\/posts$/)
    })

    test('does not leak one locale prefix into another', async ({ page }) => {
      await page.goto(path('fr', '/posts'))

      // Internal links must keep the French prefix.
      const firstPostLink = page.locator('a[href*="/fr/posts/"]').first()
      if (await firstPostLink.count()) {
        await expect(firstPostLink).toHaveAttribute('href', /\/fr\/posts\//)
      }
    })
  })

  test.describe('translated chrome', () => {
    // The skip link was hardcoded to French, which leaked into every locale.
    test('renders a translated skip link on every locale', async ({ page }) => {
      const expected: Record<string, string> = {
        en: 'Skip to main content',
        fr: 'Aller au contenu principal',
        de: 'Zum Hauptinhalt springen',
        es: 'Saltar al contenido principal',
      }

      for (const locale of locales) {
        await page.goto(path(locale, '/posts'))

        const skipLink = page.locator('a[href="#main-content"]')
        await expect(skipLink, `${locale} skip link`).toHaveText(expected[locale])
      }
    })

    test('renders a translated navigation landmark label', async ({ page }) => {
      const expected: Record<string, string> = {
        en: 'Main navigation',
        fr: 'Navigation principale',
        de: 'Hauptnavigation',
        es: 'Navegación principal',
      }

      for (const locale of locales) {
        await page.goto(path(locale, '/posts'))

        await expect(
          page.getByRole('navigation', { name: expected[locale], exact: true }).first(),
          `${locale} nav label`,
        ).toBeVisible()
      }
    })

    test('translates the posts list heading', async ({ page }) => {
      const expected: Record<string, string> = {
        en: 'Posts',
        fr: 'Articles',
        de: 'Beiträge',
        es: 'Artículos',
      }

      for (const locale of locales) {
        await page.goto(path(locale, '/posts'))

        await expect(page.locator('h1').first(), `${locale} heading`).toHaveText(expected[locale])
      }
    })
  })

  test.describe('accessibility statement', () => {
    // /de/accessibilite used to render `undefined` everywhere: the inline
    // per-locale maps only had en/es/fr keys.
    test('renders fully in German instead of blank', async ({ page }) => {
      await page.goto(path('de', '/accessibilite'))

      await expect(page.locator('h1').first()).toHaveText('Erklärung zur Barrierefreiheit')
      await expect(page.locator('body')).not.toContainText('undefined')
    })

    test('renders the localized heading in every locale', async ({ page }) => {
      const expected: Record<string, string> = {
        en: 'Accessibility Statement',
        fr: "Déclaration d'accessibilité",
        de: 'Erklärung zur Barrierefreiheit',
        es: 'Declaración de accesibilidad',
      }

      for (const locale of locales) {
        await page.goto(path(locale, '/accessibilite'))

        await expect(
          page.locator('h1').first(),
          `${locale} accessibility heading`,
        ).toHaveText(expected[locale])
      }
    })
  })

  test.describe('structured data', () => {
    // The four JSON-LD components were never imported, so no page emitted any.
    test('emits Article, FAQPage and BreadcrumbList on a post', async ({ page }) => {
      await page.goto(path('fr', '/posts/digital-horizons'))

      const types = await page.evaluate(() =>
        Array.from(document.querySelectorAll('script[type="application/ld+json"]')).flatMap(
          (node) => {
            try {
              const parsed = JSON.parse(node.textContent ?? '{}')
              const raw = parsed['@type']
              return Array.isArray(raw) ? raw : [raw]
            } catch {
              return []
            }
          },
        ),
      )

      expect(types, `emitted: ${types.join(', ')}`).toContain('Article')
      expect(types).toContain('FAQPage')
      expect(types).toContain('BreadcrumbList')
    })

    test('emits WebPage on the accessibility statement', async ({ page }) => {
      await page.goto(path('fr', '/accessibilite'))

      const types = await page.evaluate(() =>
        Array.from(document.querySelectorAll('script[type="application/ld+json"]')).flatMap(
          (node) => {
            try {
              const parsed = JSON.parse(node.textContent ?? '{}')
              const raw = parsed['@type']
              return Array.isArray(raw) ? raw : [raw]
            } catch {
              return []
            }
          },
        ),
      )

      expect(types).toContain('WebPage')
    })
  })

  test.describe('hreflang', () => {
    test('links every locale plus x-default on a post', async ({ page }) => {
      await page.goto(path('fr', '/posts/digital-horizons'))

      for (const lang of [...locales, 'x-default']) {
        await expect(page.locator(`link[rel="alternate"][hreflang="${lang}"]`)).toHaveCount(1)
      }
    })
  })

  test('serves llms.txt with a Main Content section', async ({ page }) => {
    const response = await page.goto('http://localhost:3000/llms.txt')

    expect(response?.status()).toBe(200)
    expect(await page.textContent('body')).toContain('## Main Content')
  })
})