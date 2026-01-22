import { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const GoogleTranslate = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add Google Translate script if not already present
    const scriptId = "google-translate-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,fr,es,pt",
            layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };
  }, []);

  return (
    <div className="relative flex items-center">
      <Button
        variant="ghost"
        size="sm"
        className="gap-2 text-navy hover:bg-primary/50"
        onClick={() => setIsVisible(!isVisible)}
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">Translate</span>
      </Button>

      <div
        id="google_translate_element"
        className={`absolute top-full right-0 mt-2 transition-all duration-200 z-[100] ${isVisible ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
          }`}
        style={{ minWidth: "200px" }}
      />

      <style>{`
        /* Hide the top banner */
        .goog-te-banner-frame { display: none !important; }
        body { top: 0 !important; }
        
        /* Style the widget container */
        #google_translate_element {
          background: white;
          padding: 8px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          border: 1px solid hsl(var(--border));
        }

        /* Clean up Google default styles */
        .goog-te-gadget {
          font-family: inherit !important;
          color: transparent !important;
        }
        .goog-te-gadget span {
          display: none !important;
        }
        .goog-te-gadget .goog-te-combo {
          display: block !important;
          width: 100% !important;
          padding: 6px !important;
          border-radius: 4px !important;
          border: 1px solid #ddd !important;
          color: #333 !important;
          background: white !important;
          margin: 0 !important;
        }
        
        /* Hide the powered by google text */
        .goog-logo-link { display: none !important; }
        .goog-te-gadget { height: auto !important; }
        .VIpgJd-ZVi9od-ORHb-OEVmcd { display: none !important; }
      `}</style>
    </div>
  );
};

export default GoogleTranslate;
