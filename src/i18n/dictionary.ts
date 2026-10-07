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
      label: t('search.label'),
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
      ariaLabel: t('pagination.ariaLabel'),
      goToPreviousPage: t('pagination.goToPreviousPage'),
      goToNextPage: t('pagination.goToNextPage'),
      morePages: t('pagination.morePages'),
    },
    footer: {
      rights: t('footer.rights'),
    },
    languageSwitcher: {
      label: t('languageSwitcher.label'),
      ariaLabel: t('languageSwitcher.ariaLabel'),
    },
    common: {
      noImage: t('common.noImage'),
      untitledCategory: t('common.untitledCategory'),
      selectTheme: t('common.selectTheme'),
      theme: t('common.theme'),
    },
    a11y: {
      skipToContent: t('a11y.skipToContent'),
      mainNavigation: t('a11y.mainNavigation'),
      footerNavigation: t('a11y.footerNavigation'),
      newWindow: t('a11y.newWindow'),
      breadcrumb: t('a11y.breadcrumb'),
      close: t('a11y.close'),
    },
    accessibility: {
      metaTitle: t('accessibility.metaTitle'),
      title: t('accessibility.title'),
      intro: t('accessibility.intro'),
      complianceStatus: t('accessibility.complianceStatus'),
      referenceStandard: t('accessibility.referenceStandard'),
      auditDate: t('accessibility.auditDate'),
      globalComplianceRate: t('accessibility.globalComplianceRate'),
      status: t('accessibility.status'),
      fullyCompliant: t('accessibility.fullyCompliant'),
      partiallyCompliant: t('accessibility.partiallyCompliant'),
      nonCompliant: t('accessibility.nonCompliant'),
      nonConformantCriteria: t('accessibility.nonConformantCriteria'),
      criterion: t('accessibility.criterion'),
      thematic: t('accessibility.thematic'),
      derogation: t('accessibility.derogation'),
      justification: t('accessibility.justification'),
      derogationYes: t('accessibility.derogationYes'),
      derogationNo: t('accessibility.derogationNo'),
      contactAndFeedback: t('accessibility.contactAndFeedback'),
      contactIntro: t('accessibility.contactIntro'),
      relatedDocuments: t('accessibility.relatedDocuments'),
      multiannualScheme: t('accessibility.multiannualScheme'),
      annualActionPlan: t('accessibility.annualActionPlan'),
      technologiesUsed: t('accessibility.technologiesUsed'),
      testEnvironment: t('accessibility.testEnvironment'),
      testEnvironmentIntro: t('accessibility.testEnvironmentIntro'),
    },
  }
}