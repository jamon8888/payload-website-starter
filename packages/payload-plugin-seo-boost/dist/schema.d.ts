export type AnswerBlock = {
    answer?: string | null;
    question?: string | null;
};
export type SchemaSource = {
    /** Payload form state can hold an uninitialised object before an array row exists. */
    answerBlocks?: unknown;
    canonicalURL?: string | null;
    description?: string | null;
    image?: unknown;
    locale?: string | null;
    publishedAt?: string | null;
    schemaType?: string | null;
    slug?: string | null;
    title?: string | null;
};
export type SchemaRecommendation = {
    ogDescription: string;
    ogImageURL: string;
    ogTitle: string;
    schema: Record<string, unknown>;
    schemaType: string;
};
/** Builds a recommendation only from content already authored by an editor. */
export declare const buildSchemaRecommendation: (source: SchemaSource) => SchemaRecommendation;
//# sourceMappingURL=schema.d.ts.map