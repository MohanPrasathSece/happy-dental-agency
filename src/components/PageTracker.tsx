
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const PageTracker = () => {
    const location = useLocation();

    useEffect(() => {
        const trackPageView = async () => {
            try {
                // Don't track admin pages
                if (location.pathname.startsWith("/admin")) return;

                // Simple user agent check to avoid bots (basic)
                const userAgent = navigator.userAgent;
                if (userAgent.includes("bot") || userAgent.includes("spider")) return;

                const { error } = await supabase.from("page_views").insert([
                    {
                        path: location.pathname,
                        user_agent: userAgent,
                        // ip_hash: handled by backend or ignored for privacy for now (Supabase Auth can log IP but simpler table here)
                    }
                ]);

                if (error) console.error("Tracking error:", error);
            } catch (e) {
                console.error("Tracking failed:", e);
            }
        };

        trackPageView();
    }, [location.pathname]);

    return null; // This component renders nothing
};

export default PageTracker;
