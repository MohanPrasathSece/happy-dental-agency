import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Home, Info, Building2, Heart, Workflow, Mail } from "lucide-react";
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

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const navLinks = [
        { name: "Home", path: "/", icon: Home },
        { name: "About Us", path: "/about", icon: Info },
        { name: "Dental Practices", path: "/dental-practices", icon: Building2 },
        { name: "Dental Nurses", path: "/dental-nurses", icon: Heart },
        { name: "How It Works", path: "/how-it-works", icon: Workflow },
        { name: "Contact", path: "/contact", icon: Mail },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 lg:duration-300 py-1 ${isScrolled && !isOpen
                ? "bg-white lg:bg-white/80 lg:backdrop-blur-md lg:shadow-md lg:border-b lg:border-white/20 lg:py-2"
                : "bg-white lg:bg-transparent lg:py-2"
                }`}
        >
            <div className="flex items-center justify-between px-4 md:px-8 lg:px-12">
                <Link to="/" className="relative z-10 lg:ml-12">
                    <Logo size="sm" showText={false} />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(link.path)
                                ? "bg-primary text-primary-foreground"
                                : "text-foreground hover:bg-primary/50 hover:text-primary-foreground"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Desktop Actions */}
                <div className="hidden lg:flex items-center gap-3 lg:mr-4">
                    <a href="tel:+447944624039">
                        <Button variant="outline" size="sm" className="gap-2 border-champagne-dark text-navy hover:bg-primary hover:text-primary-foreground">
                            <Phone className="w-4 h-4" />
                            Call Us
                        </Button>
                    </a>
                    <Link to="/dental-practices">
                        <Button variant="cta" size="sm">
                            Book for a Nurse
                        </Button>
                    </Link>
                    <GoogleTranslate />
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="lg:hidden relative z-[60] p-2 text-foreground hover:bg-primary/20 rounded-lg transition-colors"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* Mobile Navigation Overlay */}
                <div
                    className={`fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-200 z-40 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                    onClick={() => setIsOpen(false)}
                />

                {/* Mobile Navigation Menu */}
                <div
                    className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-background lg:hidden transition-transform duration-200 ease-out z-50 shadow-2xl border-l border-border ${isOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    <div className="flex flex-col h-full">
                        {/* Menu Header */}
                        <div className="px-6 pt-20 pb-8 border-b border-border/50">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-1">Menu</h2>
                                    <p className="text-sm text-muted-foreground">Navigate our site</p>
                                </div>
                                <X
                                    className="w-6 h-6 text-muted-foreground cursor-pointer lg:hidden"
                                    onClick={() => setIsOpen(false)}
                                />
                            </div>
                            <div className="flex justify-center">
                                <GoogleTranslate />
                            </div>
                        </div>

                        {/* Navigation Links */}
                        <nav className="flex-1 overflow-y-auto px-4 py-6">
                            <div className="flex flex-col gap-2">
                                {navLinks.map((link, index) => {
                                    const Icon = link.icon;
                                    return (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            className={`group relative px-4 py-4 rounded-xl text-base font-medium transition-all duration-200 flex items-center gap-4 ${isActive(link.path)
                                                ? "bg-gradient-to-r from-primary to-primary-dark text-primary-foreground shadow-md"
                                                : "text-foreground hover:bg-primary/20 hover:translate-x-1"
                                                }`}
                                            style={{
                                                animation: isOpen ? `slideIn 0.3s ease-out ${index * 0.05}s both` : 'none'
                                            }}
                                        >
                                            <div className={`p-2 rounded-lg transition-colors ${isActive(link.path)
                                                ? "bg-white/20"
                                                : "bg-primary/10 group-hover:bg-primary/20"
                                                }`}>
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <span className="flex-1">{link.name}</span>
                                            {isActive(link.path) && (
                                                <div className="w-2 h-2 rounded-full bg-white" />
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </nav>
                    </div>
                </div>
            </div>

        </header>
    );
};

export default Header;
