import type { Plugin } from 'payload';
import { type NimSettings } from './nim';
export { buildSchemaRecommendation } from './schema';
export type { AnswerBlock, SchemaRecommendation, SchemaSource } from './schema';
export { NIM_DEFAULT_MODEL, parseSeoBoostSuggestion, suggestSeoBoost } from './nim';
export type { NimSettings, SeoBoostSuggestion } from './nim';
export type SeoBoostPluginOptions = {
    /** Payload collection slugs that receive the SEO Boost editor tab. */
    collections: string[];
    /** Disable this when the host uses a custom API route or dashboard layout. */
    dashboard?: boolean;
    nim?: Pick<NimSettings, 'baseURL' | 'model'>;
};
/** Adds Payload configuration only. The host project owns and reviews its database migration. */
export declare const seoBoostPlugin: (options: SeoBoostPluginOptions) => Plugin;
//# sourceMappingURL=index.d.ts.map