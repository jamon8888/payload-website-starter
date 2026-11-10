'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
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
