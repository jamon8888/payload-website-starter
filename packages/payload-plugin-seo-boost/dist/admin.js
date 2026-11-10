'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from 'react';
import { useField, useFormFields } from '@payloadcms/ui';
import { buildSchemaRecommendation } from './schema';
export const SeoBoostDashboard = () => {
    const [data, setData] = useState(null);
    const [failed, setFailed] = useState(false);
    useEffect(() => {
        fetch('/api/seo-boost/dashboard')
            .then((response) => (response.ok ? response.json() : Promise.reject()))
            .then(setData)
            .catch(() => setFailed(true));
    }, []);
    return (_jsxs("section", { "aria-labelledby": "seo-boost-title", style: { marginBlock: '1.5rem' }, children: [_jsx("h2", { id: "seo-boost-title", children: "SEO Boost" }), failed && _jsx("p", { role: "alert", children: "The SEO Boost dashboard could not be loaded." }), !data && !failed && _jsx("p", { children: "Loading editorial metrics\u2026" }), data && (_jsxs("dl", { style: { display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))' }, children: [_jsxs("div", { children: [_jsx("dt", { children: "SEO health" }), _jsxs("dd", { children: [data.audit.averageScore, "/100"] })] }), _jsxs("div", { children: [_jsx("dt", { children: "Content audited" }), _jsx("dd", { children: data.audit.documents })] }), _jsxs("div", { children: [_jsx("dt", { children: "Search clicks" }), _jsx("dd", { children: data.performance.clicks })] }), _jsxs("div", { children: [_jsx("dt", { children: "AI citations" }), _jsxs("dd", { children: [data.citations.confirmed, " confirmed"] })] })] }))] }));
};
export default SeoBoostDashboard;
const readField = (fields, path) => fields?.[path]?.value;
/** An editor-controlled prefill; nothing changes until it is applied and saved. */
export const SeoBoostSchemaGenerator = () => {
    const fields = useFormFields((state) => state[0]);
    const social = useField({ path: 'seoBoost.social' });
    const recommendation = useMemo(() => buildSchemaRecommendation({
        answerBlocks: (readField(fields, 'aeo.answerBlocks') || readField(fields, 'answerBlocks')),
        canonicalURL: readField(fields, 'seoBoost.canonicalURL'),
        description: (readField(fields, 'meta.description') || readField(fields, 'aeo.aeoSummary')),
        image: readField(fields, 'meta.image') || readField(fields, 'heroImage'),
        locale: readField(fields, 'locale'),
        publishedAt: readField(fields, 'publishedAt'),
        schemaType: readField(fields, 'seoBoost.social.schemaType'),
        slug: readField(fields, 'slug'),
        title: (readField(fields, 'meta.title') || readField(fields, 'title')),
    }), [fields]);
    const apply = () => social.setValue({ ...(social.value || {}), ogTitle: recommendation.ogTitle, ogDescription: recommendation.ogDescription, ogImageURL: recommendation.ogImageURL, schemaType: recommendation.schemaType, schemaJSON: recommendation.schema });
    return _jsxs("section", { "aria-label": "Schema recommendation", style: { border: '1px solid var(--theme-elevation-150)', borderRadius: 8, marginBlock: '1rem', padding: '1rem' }, children: [_jsx("strong", { children: "Pr\u00E9remplir depuis la page" }), _jsx("p", { children: "Utilise le titre, la description, le slug, l\u2019image et les r\u00E9ponses d\u00E9j\u00E0 saisies. V\u00E9rifie les donn\u00E9es avant d\u2019enregistrer." }), _jsx("button", { type: "button", onClick: apply, children: "Appliquer la recommandation" }), _jsxs("details", { children: [_jsx("summary", { children: "Aper\u00E7u JSON-LD" }), _jsx("pre", { style: { overflowX: 'auto', whiteSpace: 'pre-wrap' }, children: JSON.stringify(recommendation.schema, null, 2) })] })] });
};
