import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Facebook, Linkedin, Instagram } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      {/* Main Footer */}
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-5 w-fit">
              <Logo size="sm" />
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Your trusted partner for dental nursing recruitment across the UK.
              Connecting dental practices with qualified and trainee dental nurses.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-champagne hover:text-navy transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-champagne hover:text-navy transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4 text-champagne">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "For Dental Practices", path: "/dental-practices" },
                { name: "For Dental Nurses", path: "/dental-nurses" },
                { name: "How It Works", path: "/how-it-works" },
                { name: "Contact Us", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/80 hover:text-champagne transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4 text-champagne">
              Our Services
            </h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>Locum Dental Nurses</li>
              <li>Permanent Placements</li>
              <li>Trainee Nurse Support</li>
              <li>Emergency Cover</li>
              <li>Holiday & Sickness Cover</li>
              <li>Practice Liaison</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4 text-champagne">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/80">
                <Phone className="w-4 h-4 mt-0.5 text-champagne flex-shrink-0" />
                <a href="tel:+447944624039" className="hover:text-champagne transition-colors">
                  +44 7944 624 039
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/80">
                <Mail className="w-4 h-4 mt-0.5 text-champagne flex-shrink-0" />
                <a href="mailto:info@happydentalagency.co.uk" className="hover:text-champagne transition-colors">
                  info@happydentalagency.co.uk
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/80">
                <MapPin className="w-4 h-4 mt-0.5 text-champagne flex-shrink-0" />
                <span>United Kingdom</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/80">
                <Clock className="w-4 h-4 mt-0.5 text-champagne flex-shrink-0" />
                <span>Mon - Fri: 8:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-white/60">
          <p className="order-3 md:order-1 text-center md:text-left">
            © {currentYear} Happy Dental Agency. All rights reserved.
          </p>

          <div className="flex flex-col items-center gap-1 order-1 md:order-2">
            <p className="text-xs text-white/40">
              Crafted with digital excellence by{" "}
              <a
                href="https://www.zyradigitals.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-champagne hover:text-white transition-colors font-medium border-b border-champagne/30"
              >
                Zyra Digitals
              </a>
            </p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-2 italic order-2 md:order-3 min-w-[200px]">
            <Link to="/privacy" className="hover:text-champagne transition-colors text-right">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-champagne transition-colors text-right">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
