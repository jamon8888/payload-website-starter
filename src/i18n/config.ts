export const locales = ['en', 'de', 'fr', 'es']
export const defaultLocale = 'en'
export type Locale = (typeof locales)[number] | 'all'

export const localeNames: Record<Exclude<Locale, 'all'>, string> = {
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
}