'use client'

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { NavRetroButton } from "@/components/layout/NavRetroButton";

const smiloLogoFull = "/assets/smilo-retro-camera-2-black.png";

const navLinks = [
  { label: "PRODUKTEN", href: "/#produkt" },
  { label: "SMILO IN ACTION", href: "/#galleri", variant: "action" as const },
  { label: "KONTAKT", href: "/kontakt" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);

    if (href.startsWith('/#')) {
      const hash = href.substring(1);
      if (pathname !== '/') {
        router.push('/' + hash);
      } else {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else {
      router.push(href);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-[env(safe-area-inset-top)]">
      {/* Bakgrundslager i eget kompositlager (translateZ) – annars tappar iOS Safari
          repaint av backdrop-blur under scroll så headern "släpar efter". Ligger som
          eget lager i stället för på <header>, så mobilmenyns fixed inte bryts. */}
      <div
        className={`pointer-events-none absolute inset-0 -z-10 transition-[background-color,box-shadow] duration-300 ${
          scrolled ? "bg-smilo-cream/95 shadow-sm backdrop-blur-md" : "bg-transparent"
        }`}
        style={{ transform: "translateZ(0)" }}
        aria-hidden
      />
      <div className="smilo-container">
        <div className="flex items-center justify-between gap-3 py-3 sm:py-4 lg:py-5">

          <Link href="/" className="shrink-0">
            <motion.div
              className="relative z-10"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Image
                src={smiloLogoFull}
                alt="Smilo"
                width={210}
                height={80}
                className="h-14 w-auto sm:h-16 md:h-20 lg:h-24"
                priority
              />
            </motion.div>
          </Link>

          <nav
            className="smilo-film-frame hidden md:block absolute left-1/2 -translate-x-1/2 max-w-[min(100%,30rem)] lg:max-w-[min(100%,38rem)]"
            aria-label="Huvudmeny"
          >
            <div className="smilo-film-frame__track flex items-center gap-1.5 px-1.5 py-1 lg:gap-2 lg:px-2 lg:py-1.5 xl:gap-3">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <NavRetroButton
                    label={link.label}
                    variant={link.variant === "action" ? "action" : "default"}
                    onClick={() => handleNavClick(link.href)}
                    aria-label={
                      link.variant === "action"
                        ? "Smilo in action – bilder tagna med Smilo"
                        : undefined
                    }
                    className="px-2 py-1 md:px-2.5 md:py-1.5 xl:px-4 xl:py-2"
                  />
                </motion.div>
              ))}
            </div>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <motion.button
              onClick={() => handleNavClick('/#produkt')}
              className="hidden md:inline-flex nav-retro-btn bg-smilo-digital text-smilo-cream-light border-smilo-digital-dark/40 shadow-cta px-3 py-1.5 lg:px-4 lg:py-2"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 }}
              whileTap={{ scale: 0.97 }}
            >
              KÖP NU
            </motion.button>
            <motion.button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden nav-retro-btn nav-retro-btn-default px-3 py-2"
              whileTap={{ scale: 0.95 }}
              aria-label="Öppna meny"
            >
              <Menu className="w-4 h-4" strokeWidth={2} />
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
            className="fixed inset-0 z-[100] bg-smilo-cream md:hidden overflow-y-auto overscroll-contain pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
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
                className="nav-retro-btn nav-retro-btn-default px-3 py-2"
                whileTap={{ scale: 0.9, rotate: 90 }}
                aria-label="Stäng meny"
              >
                <X className="w-4 h-4" strokeWidth={2} />
              </motion.button>
            </div>

            <nav
              className="flex flex-col items-center pt-16 sm:pt-20 px-6 sm:px-8 relative z-10"
              aria-label="Mobilmeny"
            >
              <div className="smilo-film-frame smilo-film-frame--vertical w-full max-w-xs">
                <div className="smilo-film-frame__track flex flex-col items-center gap-4 w-full px-4 py-5 sm:py-6">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.label}
                      className="w-full flex justify-center"
                      initial={{ opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.08 + index * 0.08 }}
                    >
                      <NavRetroButton
                        label={link.label}
                        variant={link.variant === "action" ? "action" : "default"}
                        onClick={() => handleNavClick(link.href)}
                        large
                        aria-label={
                          link.variant === "action"
                            ? "Smilo in action – bilder tagna med Smilo"
                            : undefined
                        }
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.button
                onClick={() => handleNavClick('/#produkt')}
                className="mt-8 w-full max-w-xs px-8 py-4 bg-smilo-digital text-smilo-cream-light rounded-sm text-sm font-heading font-semibold uppercase tracking-[0.18em] shadow-cta border-2 border-smilo-digital-dark/40"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                whileTap={{ scale: 0.98 }}
              >
                KÖP NU
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
