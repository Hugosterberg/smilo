import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import smajlLogoFull from "@/assets/smajl-logo-full.png";

const navLinks = [
  { label: "Handla", href: "#produkt" },
  { label: "Spåra paket", href: "#spara" },
  { label: "Kontakt", href: "#kontakt" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-smajl-cream">
      <div className="smajl-container">
        {/* Main header row */}
        <div className="flex items-center justify-between py-5 md:py-6">
          
          {/* Logo - centered on mobile, left on desktop */}
          <motion.a 
            href="#" 
            className="md:order-1"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img 
              src={smajlLogoFull} 
              alt="smajl" 
              className="h-11 md:h-14 w-auto"
            />
          </motion.a>

          {/* Desktop Navigation - simple elegant links */}
          <nav className="hidden md:flex items-center gap-12 order-2">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="relative text-smajl-brown-light hover:text-smajl-olive transition-colors duration-500 text-[15px] tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                {link.label}
                <motion.span 
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-smajl-gold origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </nav>

          {/* Mobile menu toggle - just text */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-smajl-brown-light text-[15px] tracking-wide"
          >
            {mobileMenuOpen ? "Stäng" : "Meny"}
          </button>
        </div>

        {/* Subtle decorative line */}
        <div className="h-px bg-gradient-to-r from-transparent via-smajl-gold/30 to-transparent" />
      </div>

      {/* Mobile Menu - full screen takeover */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-smajl-cream z-40 md:hidden"
          >
            <div className="flex flex-col items-center justify-center min-h-screen px-8">
              {/* Close button at top */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-6 right-6 text-smajl-brown-light text-[15px]"
              >
                Stäng
              </button>

              {/* Navigation links - large and centered */}
              <nav className="flex flex-col items-center gap-8">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-3xl text-smajl-brown hover:text-smajl-olive transition-colors"
                    style={{ fontFamily: "'Fraunces', serif" }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              {/* Tagline at bottom */}
              <motion.p 
                className="absolute bottom-12 text-sm italic text-smajl-brown-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Fånga ögonblicken
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
