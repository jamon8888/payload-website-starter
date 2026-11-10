const clean = (value) => (typeof value === 'string' ? value.trim() : '');
const imageURL = (image) => {
    if (typeof image === 'string')
        return clean(image);
    if (image && typeof image === 'object' && 'url' in image)
        return clean(image.url);
    return '';
};
const trimTo = (value, maximum) => value.length > maximum ? `${value.slice(0, maximum - 1).trim()}…` : value;
const answerBlocks = (value) => Array.isArray(value) ? value : [];
/** Builds a recommendation only from content already authored by an editor. */
export const buildSchemaRecommendation = (source) => {
    const title = clean(source.title) || 'Untitled page';
    const description = clean(source.description);
    const image = imageURL(source.image);
    const canonical = clean(source.canonicalURL);
    const slug = clean(source.slug).replace(/^\/+/, '');
    const url = canonical || (slug ? `/${slug}` : '');
    const isArticle = Boolean(clean(source.publishedAt));
    const schemaType = clean(source.schemaType) || (isArticle ? 'Article' : 'WebPage');
    const language = clean(source.locale).replace('_', '-') || undefined;
    const answers = answerBlocks(source.answerBlocks).filter((item) => clean(item.question) && clean(item.answer));
    const schema = { '@context': 'https://schema.org', '@type': schemaType, name: title, description: description || undefined, image: image || undefined, inLanguage: language, url: url || undefined };
    if (isArticle) {
        schema.headline = title;
        schema.datePublished = clean(source.publishedAt);
    }
    if (schemaType === 'FAQPage' && answers.length)
        schema.mainEntity = answers.map((item) => ({ '@type': 'Question', name: clean(item.question), acceptedAnswer: { '@type': 'Answer', text: clean(item.answer) } }));
    return { ogDescription: trimTo(description, 200), ogImageURL: image, ogTitle: title, schema, schemaType };
};
