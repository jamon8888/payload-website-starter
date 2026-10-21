import type { PayloadRequest } from 'payload'

import { mcpPlugin } from '@payloadcms/plugin-mcp'

/**
 * Any signed-in user of the `users` collection is an administrator in this
 * project (the access functions are `authenticated`), so it is the check used
 * to grant access to the MCP API keys.
 */
const isAdmin = ({ req }: { req: PayloadRequest }): boolean => Boolean(req.user)

/**
 * MCP (Model Context Protocol) server for this Payload instance.
 *
 * The endpoint lives at `/api/mcp` and expects an API key as a Bearer token.
 * The plugin creates the `payload-mcp-api-keys` collection: the per-collection
 * and per-global capabilities are toggled per key from the admin panel
 * (MCP → API Keys), so enabling a collection here only declares *what* can be
 * exposed — a key still has to allow it.
 */
export const mcp = mcpPlugin({
  collections: {
    posts: {
      description:
        'Editorial articles of the site (tech, finance, community resilience). Localized: title, content, AEO summary and answer blocks exist in en, de, fr and es.',
      enabled: { find: true, create: true, update: true, delete: true },
    },
    pages: {
      description:
        'Static pages of the site (home, contact, accessibility statements). The layout is made of blocks (content, media, video, how-to, accordion, tabs, data table, embed, modal).',
      enabled: { find: true, create: true, update: true, delete: true },
    },
    categories: {
      description: 'Categories used to group the articles.',
      enabled: { find: true, create: true, update: true, delete: true },
    },
    'accessibility-statements': {
      description:
        'Per-content accessibility statements (RGAA 13.3): compliance status, audit date, non-conformities and their derogation.',
      enabled: { find: true, create: true, update: true, delete: true },
    },
    media: {
      description:
        'Media library (images and videos). Every document carries a role (informative or decorative) and an alternative text.',
      enabled: { find: true, update: true },
    },
    users: {
      description: 'The people who can sign in to the admin panel.',
      enabled: { find: true },
    },
  },
  globals: {
    'site-settings': {
      description:
        'The customizer: brand name, logo, theme tokens (primary colour, radius, font, default colour scheme) and SEO defaults (title template, description, social image, X handle).',
      enabled: { find: true, update: true },
    },
    header: {
      description: 'Navigation items of the header, per locale.',
      enabled: { find: true, update: true },
    },
    footer: {
      description: 'Navigation items of the footer, per locale.',
      enabled: { find: true, update: true },
    },
    'accessibility-statement': {
      description:
        'Site-wide accessibility statement: referential version, global compliance rate, non-conformities and contact.',
      enabled: { find: true, update: true },
    },
  },
  // The generated API keys collection is denied to the admin panel by default;
  // without this override it cannot be seen (nor managed) in the admin.
  overrideApiKeyCollection: (collection) => {
    collection.access = {
      create: isAdmin,
      delete: isAdmin,
      read: isAdmin,
      unlock: isAdmin,
      update: isAdmin,
    }

    collection.fields = collection.fields.map((field) =>
      'name' in field && field.name === 'user'
        ? ({ ...field, access: { create: isAdmin, update: isAdmin } } as typeof field)
        : field,
    ) as typeof collection.fields

    return collection
  },
  mcp: {
    handlerOptions: {
      maxDuration: 60,
      verboseLogs: false,
    },
    serverOptions: {
      serverInfo: {
        name: 'Payload Website MCP',
        version: '1.0.0',
      },
    },
  },
})
