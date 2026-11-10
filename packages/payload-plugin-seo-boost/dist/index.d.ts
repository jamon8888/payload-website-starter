import type { Plugin } from 'payload';
export type SeoBoostPluginOptions = {
    /** Payload collection slugs that receive the SEO Boost editor tab. */
    collections: string[];
    /** Disable this when the host uses a custom API route or dashboard layout. */
    dashboard?: boolean;
};
/** Adds Payload configuration only. The host project owns and reviews its database migration. */
export declare const seoBoostPlugin: (options: SeoBoostPluginOptions) => Plugin;
//# sourceMappingURL=index.d.ts.map