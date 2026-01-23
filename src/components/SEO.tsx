import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
    title: string;
    description: string;
}

const SEO = ({ title, description }: SEOProps) => {
    const location = useLocation();

    useEffect(() => {
        document.title = `${title} | Happy Dental Agency`;

        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", description);
        }

        // Update OG meta tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute("content", title);

        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) ogDescription.setAttribute("content", description);

        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) ogUrl.setAttribute("content", `https://happydentalagency.co.uk${location.pathname}`);

    }, [title, description, location.pathname]);

    return null;
};

export default SEO;
