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
export const NimAPIKeyField = () => {
    const field = useField({ path: 'nimAPIKey' });
    return _jsxs("label", { htmlFor: "seo-boost-nim-api-key", style: { display: 'grid', gap: '0.5rem' }, children: [_jsx("span", { children: "NVIDIA NIM API key" }), _jsx("input", { autoComplete: "new-password", id: "seo-boost-nim-api-key", onChange: (event) => field.setValue(event.target.value), placeholder: "nvapi-\u2026", type: "password", value: field.value || '' }), _jsx("small", { children: "Cette cl\u00E9 n\u2019est transmise qu\u2019\u00E0 l\u2019API serveur de Payload." })] });
};
/** An editor-controlled prefill; nothing changes until it is applied and saved. */
export const SeoBoostSchemaGenerator = () => {
    const fields = useFormFields((state) => state[0]);
    const seoBoost = useField({ path: 'seoBoost' });
    const [aiError, setAIError] = useState(null);
    const [aiRecommendation, setAIRecommendation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
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
    const apply = () => seoBoost.setValue({ ...(seoBoost.value || {}), social: { ...(seoBoost.value?.social || {}), ogTitle: recommendation.ogTitle, ogDescription: recommendation.ogDescription, ogImageURL: recommendation.ogImageURL, schemaType: recommendation.schemaType, schemaJSON: recommendation.schema } });
    const requestAI = async () => {
        setAIError(null);
        setIsLoading(true);
        try {
            const response = await fetch('/api/seo-boost/suggest', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ document: { answerBlocks: readField(fields, 'aeo.answerBlocks') || readField(fields, 'answerBlocks'), canonicalURL: readField(fields, 'seoBoost.canonicalURL'), description: readField(fields, 'meta.description') || readField(fields, 'aeo.aeoSummary'), image: readField(fields, 'meta.image') || readField(fields, 'heroImage'), locale: readField(fields, 'locale'), publishedAt: readField(fields, 'publishedAt'), schemaType: readField(fields, 'seoBoost.social.schemaType'), slug: readField(fields, 'slug'), title: readField(fields, 'meta.title') || readField(fields, 'title') } }) });
            const data = await response.json();
            if (!response.ok || !data.suggestion)
                throw new Error(data.message || 'La suggestion IA a échoué.');
            setAIRecommendation(data.suggestion);
        }
        catch (error) {
            setAIError(error instanceof Error ? error.message : 'La suggestion IA a échoué.');
        }
        finally {
            setIsLoading(false);
        }
    };
    const applyAI = () => aiRecommendation && seoBoost.setValue({ ...(seoBoost.value || {}), canonicalURL: aiRecommendation.canonicalURL, focusKeyword: aiRecommendation.focusKeyword, robots: aiRecommendation.robots, secondaryKeywords: aiRecommendation.secondaryKeywords.map((keyword) => ({ keyword })), social: { ...(seoBoost.value?.social || {}), ...aiRecommendation.social, schemaJSON: aiRecommendation.social.schema } });
    return _jsxs("section", { "aria-label": "Schema recommendation", style: { border: '1px solid var(--theme-elevation-150)', borderRadius: 8, marginBlock: '1rem', padding: '1rem' }, children: [_jsx("strong", { children: "Pr\u00E9remplir depuis la page" }), _jsx("p", { children: "Utilise le titre, la description, le slug, l\u2019image et les r\u00E9ponses d\u00E9j\u00E0 saisies. V\u00E9rifie les donn\u00E9es avant d\u2019enregistrer." }), _jsx("button", { type: "button", onClick: apply, children: "Appliquer la recommandation" }), _jsx("button", { type: "button", disabled: isLoading, onClick: () => void requestAI(), style: { marginInlineStart: '0.5rem' }, children: isLoading ? 'Analyse avec Mistral…' : 'Proposer avec Mistral' }), aiError && _jsx("p", { role: "alert", children: aiError }), aiRecommendation && _jsxs("div", { style: { marginBlockStart: '1rem' }, children: [_jsxs("p", { children: [_jsx("strong", { children: "Proposition IA :" }), " ", aiRecommendation.focusKeyword || 'mot-clé à préciser', " \u2014 sch\u00E9ma ", aiRecommendation.social.schemaType] }), _jsx("button", { type: "button", onClick: applyAI, children: "Appliquer tous les champs IA" })] }), _jsxs("details", { children: [_jsx("summary", { children: "Aper\u00E7u JSON-LD" }), _jsx("pre", { style: { overflowX: 'auto', whiteSpace: 'pre-wrap' }, children: JSON.stringify(aiRecommendation?.social.schema || recommendation.schema, null, 2) })] })] });
};
