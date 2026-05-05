'use client'

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const smiloLogoFull = "/assets/smilo-logo-full.png";

const navLinks = [
  { label: "Produkten", href: "/#produkt" },
  { label: "Galleri", href: "/#galleri" },
  { label: "Kontakt", href: "/kontakt" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);

    if (href.startsWith('/#')) {
      const hash = href.substring(1);
      if (pathname !== '/') {
        router.push('/' + hash);
      } else {
        const element = document.querySelector(hash);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(href);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-smilo-cream/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="smilo-container">
        <div className="flex items-center justify-between py-4 md:py-6">

          <Link href="/">
            <motion.div
              className="relative z-10"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Image src={smiloLogoFull} alt="Smilo" width={210} height={80} className="h-10 md:h-14 w-auto" priority />
            </motion.div>
          </Link>

          <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link, index) => (
              <motion.button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="relative text-[15px] text-smilo-brown hover:text-smilo-olive transition-colors duration-300 font-medium group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-smilo-olive transition-all duration-300 group-hover:w-full" />
              </motion.button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <motion.button
              className="relative text-smilo-brown hover:text-smilo-olive transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
              {cartCount > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 w-4 h-4 bg-smilo-olive text-white text-[10px] rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>

            <motion.button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-smilo-brown hover:text-smilo-olive transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <Menu className="w-6 h-6" strokeWidth={1.5} />
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-smilo-cream z-50 md:hidden"
          >
            <motion.div
              className="absolute top-20 right-10 w-64 h-64 rounded-full bg-smilo-olive/10 blur-3xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-32 left-5 w-48 h-48 rounded-full bg-smilo-gold-soft/30 blur-3xl"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            />

            <div className="smilo-container py-4 flex justify-between items-center relative z-10">
              <Image src={smiloLogoFull} alt="Smilo" width={150} height={57} className="h-10 w-auto" priority />
              <motion.button
                onClick={() => setMobileMenuOpen(false)}
                className="text-smilo-brown p-2"
                whileTap={{ scale: 0.9, rotate: 90 }}
              >
                <X className="w-6 h-6" strokeWidth={1.5} />
              </motion.button>
            </div>

            <nav className="flex flex-col items-center justify-center gap-8 pt-24 relative z-10">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-4xl text-smilo-brown hover:text-smilo-olive transition-colors font-heading"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                >
                  {link.label}
                </motion.button>
              ))}

              <motion.button
                onClick={() => handleNavClick('/#produkt')}
                className="mt-8 px-8 py-4 bg-smilo-olive text-white rounded-full text-lg font-medium shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileTap={{ scale: 0.95 }}
              >
                Köp nu
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
