import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import smajlLogoFull from "@/assets/smajl-logo-full.png";

const navLinks = [
  { label: "Handla", href: "#produkt", emoji: "📷" },
  { label: "Spåra paket", href: "#spara", emoji: "📦" },
  { label: "Kontakt", href: "#kontakt", emoji: "💌" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-smajl-cream" />
      
      <div className="relative smajl-container">
        <nav className="flex items-center justify-between py-4 md:py-5">
          
          {/* Left side - Logo */}
          <motion.a 
            href="#" 
            className="relative z-10"
            whileHover={{ rotate: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <img 
              src={smajlLogoFull} 
              alt="smajl" 
              className="h-10 md:h-12 w-auto"
            />
          </motion.a>

          {/* Center - Decorative element (desktop only) */}
          <motion.div 
            className="hidden lg:flex items-center gap-2 text-smajl-gold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-xs italic text-smajl-brown-light">fånga ögonblicken</span>
            <Sparkles className="w-4 h-4" />
          </motion.div>

          {/* Right side - Navigation (desktop) */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center bg-white/60 backdrop-blur-sm rounded-full px-2 py-1.5 shadow-soft">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="group relative flex items-center gap-2 px-4 py-2 rounded-full text-sm text-smajl-brown hover:bg-smajl-gold/20 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                >
                  <span className="text-base group-hover:scale-110 transition-transform">{link.emoji}</span>
                  <span className="font-medium">{link.label}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center gap-2 px-4 py-2 bg-white/60 rounded-full text-smajl-brown shadow-soft"
            whileTap={{ scale: 0.95 }}
            aria-label="Öppna meny"
          >
            <span className="text-sm font-medium">Meny</span>
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-smajl-brown/20 backdrop-blur-sm md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="md:hidden absolute top-full left-4 right-4 mt-2 bg-white rounded-3xl shadow-card overflow-hidden"
            >
              <div className="p-4 space-y-1">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-4 py-4 px-4 text-smajl-brown hover:bg-smajl-cream rounded-2xl transition-all duration-300"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.08 }}
                    whileTap={{ scale: 0.98, x: 4 }}
                  >
                    <span className="text-2xl">{link.emoji}</span>
                    <span className="text-lg font-medium">{link.label}</span>
                  </motion.a>
                ))}
              </div>
              
              {/* Footer with tagline */}
              <div className="px-6 py-4 bg-smajl-cream/50 text-center">
                <p className="text-sm italic text-smajl-brown-light">
                  ✨ Fånga ögonblicken, lev i stunden ✨
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
