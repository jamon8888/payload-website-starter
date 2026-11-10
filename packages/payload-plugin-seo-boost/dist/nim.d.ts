import type { SchemaRecommendation, SchemaSource } from './schema';
export declare const NIM_DEFAULT_MODEL = "mistralai/mistral-large-4-1t-a52b";
export declare const NIM_DEFAULT_BASE_URL = "https://integrate.api.nvidia.com/v1/chat/completions";
export type SeoBoostSuggestion = {
    canonicalURL: string;
    focusKeyword: string;
    robots: 'index-follow' | 'noindex-follow' | 'noindex-nofollow';
    secondaryKeywords: string[];
    social: SchemaRecommendation;
};
export type NimSettings = {
    apiKey?: string | null;
    baseURL?: string | null;
    model?: string | null;
};
export declare const parseSeoBoostSuggestion: (content: string) => SeoBoostSuggestion;
export declare const suggestSeoBoost: ({ apiKey, baseURL, fetcher, model, source }: NimSettings & {
    fetcher?: typeof fetch;
    source: SchemaSource;
}) => Promise<SeoBoostSuggestion>;
//# sourceMappingURL=nim.d.ts.map