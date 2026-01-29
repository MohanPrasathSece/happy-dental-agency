import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Home, Info, Building2, Heart, Workflow, Mail, Clock, Facebook, Instagram, Linkedin, Twitter, Briefcase } from "lucide-react";
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
        { name: "Jobs", path: "/jobs", icon: Briefcase },
        { name: "How It Works", path: "/how-it-works", icon: Workflow },
        { name: "Timesheet", path: "/timesheet", icon: Clock },
        { name: "Contact", path: "/contact", icon: Mail },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 xl:duration-300 py-1 ${isScrolled && !isOpen
                ? "bg-white xl:bg-white/80 xl:backdrop-blur-md xl:shadow-md xl:border-b xl:border-white/20 xl:py-4"
                : "bg-white xl:bg-transparent xl:py-6"
                }`}
        >
            <div className="flex items-center justify-between px-4 md:px-8 xl:px-12">
                <Link to="/" className="relative z-10 xl:ml-12">
                    <Logo size="sm" showText={false} />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden xl:flex items-center gap-1">
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
                <div className="hidden xl:flex items-center gap-4 xl:mr-4">
                    <a href="tel:+447944624039">
                        <Button variant="outline" size="default" className="gap-2 border-champagne-dark text-navy hover:bg-primary hover:text-primary-foreground">
                            <Phone className="w-4 h-4" />
                            Call Us
                        </Button>
                    </a>
                    <GoogleTranslate />
                </div>

                {/* Mobile/Tablet Actions (Visible up to XL) */}
                <div className="flex items-center gap-2 xl:hidden ml-auto mr-2">
                    <GoogleTranslate />
                </div>

                {/* Mobile/Tablet Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="xl:hidden relative z-[60] flex items-center gap-2 px-3 py-2 text-navy hover:bg-primary/20 rounded-xl border border-navy/10 transition-all font-semibold"
                    aria-label="Toggle menu"
                >
                    <span className="text-[12px] tracking-widest hidden sm:inline">MENU</span>
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* Mobile Navigation Overlay */}
                <div
                    className={`fixed inset-0 bg-black/60 backdrop-blur-sm xl:hidden transition-opacity duration-200 z-40 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                    onClick={() => setIsOpen(false)}
                />

                {/* Mobile Navigation Menu */}
                <div
                    className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-background xl:hidden transition-transform duration-200 ease-out z-50 shadow-2xl border-l border-border ${isOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    <div className="flex flex-col h-full">
                        {/* Menu Header */}
                        <div className="px-6 pt-12 pb-6 border-b border-border/50">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h2 className="text-xl font-bold text-foreground mb-0.5">Menu</h2>
                                    <p className="text-xs text-muted-foreground">Navigate our site</p>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <GoogleTranslate />
                            </div>
                        </div>

                        {/* Navigation Links */}
                        <nav className="flex-1 overflow-y-auto px-4 py-4">
                            <div className="flex flex-col gap-1.5">
                                {navLinks.map((link, index) => {
                                    const Icon = link.icon;
                                    return (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            className={`group relative px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-3 ${isActive(link.path)
                                                ? "bg-gradient-to-r from-primary to-primary-dark text-primary-foreground shadow-md"
                                                : "text-foreground hover:bg-primary/20 hover:translate-x-1"
                                                }`}
                                            style={{
                                                animation: isOpen ? `slideIn 0.3s ease-out ${index * 0.05}s both` : 'none'
                                            }}
                                        >
                                            <div className={`p-1.5 rounded-lg transition-colors ${isActive(link.path)
                                                ? "bg-white/20"
                                                : "bg-primary/10 group-hover:bg-primary/20"
                                                }`}>
                                                <Icon className="w-4 h-4" />
                                            </div>
                                            <span className="flex-1">{link.name}</span>
                                            {isActive(link.path) && (
                                                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </nav>
                        {/* Social Links & Footer Info */}
                        <div className="p-6 border-t border-border/50 bg-muted/30">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Follow Us</p>
                            <div className="flex gap-4 mb-6">
                                {[
                                    { icon: Facebook, label: "Facebook", link: "https://www.facebook.com/profile.php?id=61587083437951" },
                                    { icon: Instagram, label: "Instagram", link: "https://instagram.com/happydentalagencyuk" },
                                    { icon: Linkedin, label: "LinkedIn", link: "https://www.linkedin.com/in/happy-dental-agency-uk" },
                                    { icon: Twitter, label: "Twitter", link: "https://x.com/happydentalAG" },
                                ].map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.link}
                                        className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center text-navy hover:bg-primary hover:text-primary-foreground transition-all shadow-sm"
                                        aria-label={social.label}
                                    >
                                        <social.icon className="w-5 h-5" />
                                    </a>
                                ))}
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] text-muted-foreground">© 2024 Happy Dental Agency</p>
                                <p className="text-[10px] text-muted-foreground">All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </header>
    );
};

export default Header;
