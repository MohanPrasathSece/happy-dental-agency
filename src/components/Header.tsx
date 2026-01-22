import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import GoogleTranslate from "./GoogleTranslate";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
        window.scrollTo(0, 0);
    }, [location]);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Dental Practices", path: "/dental-practices" },
        { name: "Dental Nurses", path: "/dental-nurses" },
        { name: "How It Works", path: "/how-it-works" },
        { name: "Contact", path: "/contact" },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "glass-effect shadow-medium py-5"
                : "bg-transparent py-10"
                }`}
        >
            <div className="container-custom flex items-center justify-between">
                <Link to="/" className="relative z-10">
                    <Logo size="md" />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(link.path)
                                ? "bg-primary text-navy"
                                : "text-foreground hover:bg-primary/50 hover:text-navy"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Desktop Actions */}
                <div className="hidden lg:flex items-center gap-3">
                    <GoogleTranslate />
                    <a href="tel:+447944624039">
                        <Button variant="outline" size="sm" className="gap-2 border-champagne-dark text-navy hover:bg-primary">
                            <Phone className="w-4 h-4" />
                            Call Us
                        </Button>
                    </a>
                    <Link to="/dental-practices">
                        <Button variant="cta" size="sm">
                            Book a Nurse
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="lg:hidden relative z-10 p-2 text-foreground"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="fixed inset-0 bg-background lg:hidden">
                        <div className="flex flex-col pt-24 px-6 pb-6 h-full overflow-y-auto">
                            <nav className="flex flex-col gap-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={`px-4 py-3 rounded-lg text-lg font-medium transition-all ${isActive(link.path)
                                            ? "bg-primary text-navy"
                                            : "text-foreground hover:bg-primary/50"
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>

                            <div className="mt-8 flex flex-col gap-3">
                                <GoogleTranslate />
                                <a href="tel:+447944624039" className="w-full">
                                    <Button variant="outline" className="w-full gap-2">
                                        <Phone className="w-4 h-4" />
                                        Call Us
                                    </Button>
                                </a>
                                <Link to="/dental-practices" className="w-full">
                                    <Button variant="cta" className="w-full">
                                        Book a Nurse
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
