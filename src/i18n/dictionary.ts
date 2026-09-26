import { getTranslations } from 'next-intl/server'
import { Locale } from './config'

export async function getDictionary(locale: Locale) {
  const t = await getTranslations({ locale, namespace: '' })
  return {
    nav: {
      home: t('nav.home'),
      posts: t('nav.posts'),
      search: t('nav.search'),
    },
    posts: {
      title: t('posts.title'),
      readMore: t('posts.readMore'),
      publishedOn: t('posts.publishedOn'),
      by: t('posts.by'),
      in: t('posts.in'),
      relatedPosts: t('posts.relatedPosts'),
    },
    search: {
      title: t('search.title'),
      placeholder: t('search.placeholder'),
      noResults: t('search.noResults'),
      resultsFor: t('search.resultsFor'),
    },
    notFound: {
      title: t('notFound.title'),
      description: t('notFound.description'),
      goHome: t('notFound.goHome'),
    },
    pageRange: {
      showing: t('pageRange.showing'),
      noResults: t('pageRange.noResults'),
    },
    hero: {
      readMore: t('hero.readMore'),
    },
    pagination: {
      previous: t('pagination.previous'),
      next: t('pagination.next'),
      page: t('pagination.page'),
    },
    footer: {
      rights: t('footer.rights'),
    },
    languageSwitcher: {
      label: t('languageSwitcher.label'),
      ariaLabel: t('languageSwitcher.ariaLabel'),
    },
  }
}