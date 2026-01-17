import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import smajlLogoFull from "@/assets/smajl-logo-full.png";

const navLinks = [
  { label: "Handla", href: "#produkt" },
  { label: "Spåra ditt paket", href: "#spara" },
  { label: "Kontakt", href: "#kontakt" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Warm paper-like background */}
      <div className="absolute inset-0 bg-gradient-to-b from-smajl-cream via-smajl-cream-light to-smajl-cream-light/95" />
      
      <div className="relative smajl-container">
        <nav className="flex items-center justify-between h-18 md:h-22 py-3">
          {/* Logo */}
          <motion.a 
            href="#" 
            className="relative z-10"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <img 
              src={smajlLogoFull} 
              alt="smajl" 
              className="h-12 md:h-14 w-auto"
            />
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="relative text-base text-smajl-brown-light hover:text-smajl-brown transition-colors duration-300"
                style={{ fontFamily: "'Fraunces', serif" }}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-3 text-smajl-brown-light hover:text-smajl-brown transition-colors rounded-full hover:bg-smajl-gold/10"
            whileTap={{ scale: 0.9 }}
            aria-label="Öppna meny"
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden absolute top-full left-0 right-0 bg-smajl-cream shadow-card overflow-hidden"
          >
            <div className="smajl-container py-6 space-y-2">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-4 px-5 text-lg text-smajl-brown-light hover:text-smajl-brown hover:bg-smajl-gold/5 rounded-2xl transition-all duration-300"
                  style={{ fontFamily: "'Fraunces', serif" }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.08 }}
                  whileHover={{ x: 8 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
            
            {/* Decorative wave */}
            <div className="h-4 bg-gradient-to-b from-smajl-cream to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
