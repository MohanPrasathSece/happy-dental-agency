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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add Google Translate script
    const addScript = () => {
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    };

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,fr,es,pt",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
      setIsLoaded(true);
    };

    addScript();

    return () => {
      // Cleanup
      const script = document.querySelector(
        'script[src*="translate.google.com"]'
      );
      if (script) {
        script.remove();
      }
    };
  }, []);

  return (
    <div className="relative">
      <div
        id="google_translate_element"
        className="translate-widget"
        style={{
          position: "absolute",
          opacity: 0,
          pointerEvents: "none",
        }}
      />
      <Button
        variant="ghost"
        size="sm"
        className="gap-2 text-navy hover:bg-primary/50"
        onClick={() => {
          const selectElement = document.querySelector(
            ".goog-te-combo"
          ) as HTMLSelectElement;
          if (selectElement) {
            // Since we can't programmatically "open" a native select, 
            // the best we can do is focus it and hope the browser helps,
            // or we make it visible so users can select.
            // Let's toggle a class to show/hide it.
            const widget = document.getElementById("google_translate_element");
            if (widget) {
              widget.style.opacity = widget.style.opacity === "1" ? "0" : "1";
              widget.style.pointerEvents = widget.style.pointerEvents === "none" ? "auto" : "none";
              widget.style.position = widget.style.position === "absolute" ? "static" : "absolute";
            }
          }
        }}
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">Translate</span>
      </Button>

      <style>{`
        .goog-te-banner-frame { display: none !important; }
        body { top: 0 !important; }
        .goog-te-gadget { font-family: inherit !important; }
        .goog-te-gadget-simple { 
          background: transparent !important; 
          border: none !important;
          padding: 0 !important;
        }
        .goog-te-menu-value span { 
          color: hsl(var(--navy)) !important; 
          font-size: 14px !important;
        }
        .skiptranslate { display: none !important; }
        .VIpgJd-ZVi9od-ORHb-OEVmcd { display: none !important; }
      `}</style>
    </div>
  );
};

export default GoogleTranslate;
