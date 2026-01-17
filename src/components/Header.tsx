import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X } from "lucide-react";
import smajlLogoFull from "@/assets/smajl-logo-full.png";

const navLinks = [
  { label: "Handla", href: "#produkt" },
  { label: "Kontakt", href: "#kontakt" },
  { label: "Spåra ditt paket", href: "#spara" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount] = useState(0);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-smajl-cream">
      <div className="smajl-container">
        <div className="flex items-center justify-between py-6 md:py-8">
          
          {/* Left - Navigation links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[15px] text-smajl-brown hover:text-smajl-olive transition-colors duration-300 font-heading"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile menu button - left side */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-smajl-brown text-[15px] font-heading"
          >
            Meny
          </button>

          {/* Center - Logo */}
          <a href="#" className="absolute left-1/2 -translate-x-1/2">
            <motion.img 
              src={smajlLogoFull} 
              alt="smajl" 
              className="h-12 md:h-16 w-auto"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </a>

          {/* Right - Cart */}
          <motion.button
            className="relative text-smajl-brown hover:text-smajl-olive transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingBag className="w-6 h-6" strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-smajl-olive text-white text-[10px] rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu - Full screen */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-smajl-cream z-50 md:hidden"
          >
            {/* Close button */}
            <div className="smajl-container py-6 flex justify-between items-center">
              <span className="text-sm text-smajl-brown-light">Meny</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-smajl-brown"
              >
                <X className="w-6 h-6" strokeWidth={1.5} />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col items-center justify-center gap-10 pt-20">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl text-smajl-brown hover:text-smajl-olive transition-colors"
                  style={{ fontFamily: "'Fraunces', serif" }}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* Logo at bottom */}
            <motion.div 
              className="absolute bottom-16 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.4 }}
            >
              <img src={smajlLogoFull} alt="" className="h-10 w-auto" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
