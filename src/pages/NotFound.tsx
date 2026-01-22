import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <main className="min-h-screen hero-gradient flex items-center justify-center px-4 pt-20">
      <div className="text-center max-w-lg">
        <div className="text-8xl font-heading font-bold text-gold mb-4">404</div>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-navy mb-4">
          Page Not Found
        </h1>
        <p className="text-muted-foreground mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/">
            <Button variant="cta" size="lg">
              <Home className="w-4 h-4" />
              Go to Homepage
            </Button>
          </Link>
          <Button variant="outline" size="lg" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
