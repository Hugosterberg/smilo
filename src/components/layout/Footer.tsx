'use client'

import { Sparkles, Heart, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { NewsletterSignup } from "@/components/shared/NewsletterSignup";
const smiloLogoFull = "/assets/smilo-retro-camera-2.png";

const MotionImage = motion.create(Image);

const INSTAGRAM_URL = "https://www.instagram.com/smilo.se";

function InstagramButton() {
  return (
    <motion.a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 shrink-0 rounded-full bg-smilo-cream/10 flex items-center justify-center text-smilo-cream/70 hover:bg-smilo-gold hover:text-smilo-brown transition-all"
      aria-label="Smilo på Instagram (öppnas i ny flik)"
      whileHover={{ scale: 1.1, rotate: -5 }}
      whileTap={{ scale: 0.95 }}
    >
      <Instagram className="w-5 h-5" aria-hidden />
    </motion.a>
  );
}

const Footer = () => {
  return (
    <footer className="bg-smilo-brown text-smilo-cream-light overflow-hidden">
      {/* Main Footer Content */}
      <div className="smilo-container py-8 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-6 sm:gap-8">
          {/* About Section - Takes more space */}
          <motion.div
            className="sm:col-span-2 md:col-span-5 text-center sm:text-left max-w-md mx-auto sm:mx-0 sm:max-w-none w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Mobil: stjärna över, hjärta under, socialt + logga i rad */}
            <div className="flex flex-col items-center sm:hidden">
              <Sparkles className="w-6 h-6 text-smilo-gold mb-3" aria-hidden />
              <h3 className="font-display text-xl font-bold mb-3">Om oss</h3>
              <div className="space-y-2.5 text-smilo-cream/80 leading-relaxed text-sm">
                <p className="italic text-balance">
                  &quot;Smilo föddes ur en enkel idé: att göra det lättare att vara närvarande i stunden.&quot;
                </p>
                <p className="text-sm text-balance">
                  Vi älskar bilder, men märkte hur ofta mobilen tog över ögonblicket.
                  Därför skapade vi Smilo – en digital kamera utan skärm, som låter dig ta bilden och fortsätta leva.
                </p>
                <p className="text-sm text-balance">
                  Designad i Sverige för vardag, fest och alla stunder däremellan.
                </p>
              </div>
              <Heart className="w-5 h-5 text-smilo-gold fill-smilo-gold my-4" aria-hidden />
              <div className="flex items-center justify-center gap-4">
                <Image
                  src={smiloLogoFull}
                  alt="Smilo"
                  width={200}
                  height={76}
                  className="h-14 w-auto brightness-110 shrink-0"
                />
                <InstagramButton />
              </div>
            </div>

            {/* Desktop */}
            <div className="hidden sm:block">
              <h3 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
                Om oss <Sparkles className="w-5 h-5 text-smilo-gold shrink-0" />
              </h3>
              <div className="space-y-4 text-smilo-cream/80 leading-relaxed">
                <p className="text-base italic text-balance">
                  &quot;Smilo föddes ur en enkel idé: att göra det lättare att vara närvarande i stunden.&quot;
                </p>
                <p className="text-sm text-balance">
                  Vi älskar bilder, men märkte hur ofta mobilen tog över ögonblicket.
                  Därför skapade vi Smilo – en digital kamera utan skärm, som låter dig ta bilden och fortsätta leva.
                </p>
                <p className="text-sm flex items-center gap-2 text-balance">
                  <Heart className="w-4 h-4 shrink-0 text-smilo-gold fill-smilo-gold" />
                  Designad i Sverige för vardag, fest och alla stunder däremellan.
                </p>
              </div>
              <div className="flex gap-4 mt-8">
                <InstagramButton />
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-6 sm:contents">
          {/* Customer Care Section */}
          <motion.div
            className="md:col-span-3 text-center sm:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-display text-lg sm:text-xl font-bold mb-3 sm:mb-6">Kundservice</h3>
            <ul className="space-y-2 sm:space-y-3 flex flex-col items-center sm:items-stretch">
              {[
                { label: "Spåra min order", href: "/spara-order" },
                { label: "Vanliga frågor", href: "/faq" },
                { label: "Frakt", href: "/leverans-faq" },
                { label: "Returer & byten", href: "/returer" },
                { label: "Kontakt", href: "/kontakt" },
                { label: "Guide: Engångskamera vs digital", href: "/engangskamera-vs-digital-retrokamera" },
              ].map((item, index) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="text-sm text-smilo-cream/70 hover:text-smilo-gold transition-colors inline-block sm:hover:translate-x-1 sm:transform sm:duration-200"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Section */}
          <motion.div
            className="md:col-span-2 text-center sm:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-display text-lg sm:text-xl font-bold mb-3 sm:mb-6">Juridiskt</h3>
            <ul className="space-y-2 sm:space-y-3 flex flex-col items-center sm:items-stretch">
              {[
                { label: "Integritetspolicy", href: "/integritetspolicy" },
                { label: "Köpvillkor", href: "/kopvillkor" },
              ].map((item, index) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="text-sm text-smilo-cream/70 hover:text-smilo-gold transition-colors inline-block sm:hover:translate-x-1 sm:transform sm:duration-200"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="mt-4 sm:mt-8 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-smilo-cream/5 border border-smilo-cream/10 max-w-[14rem] mx-auto sm:mx-0 sm:max-w-none text-center sm:text-left">
              <p className="text-xs text-smilo-cream/50">
                CE-märkt ✓
              </p>
              <p className="text-xs text-smilo-cream/50 mt-1">
                Ej lämplig för barn under 3 år
              </p>
            </div>
          </motion.div>
          </div>

          {/* Logo Section */}
          <motion.div
            className="hidden sm:flex sm:col-span-2 md:col-span-2 flex-col items-center sm:items-end justify-start order-last sm:order-none"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <MotionImage
              src={smiloLogoFull}
              alt="Smilo"
              width={360}
              height={138}
              className="h-20 sm:h-32 md:h-36 w-auto brightness-110"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
        </div>

        {/* Newsletter */}
        <div className="mt-10 sm:mt-14 pt-8 sm:pt-10 border-t border-smilo-cream/10">
          <NewsletterSignup />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-smilo-cream/10">
        <div className="smilo-container py-5 sm:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <motion.p
              className="text-sm text-smilo-cream/50 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center md:justify-start md:text-left"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              © {new Date().getFullYear()} Smilo
              <span className="inline-block">✨</span>
              <span className="text-smilo-cream/30">|</span>
              <span>Designad i Sverige</span>
            </motion.p>

            {/* Payment Icons */}
            <motion.div
              className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center max-w-full"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {/* Visa */}
              <motion.div whileHover={{ scale: 1.05, y: -2 }} className="bg-white rounded-md p-1.5 shadow-sm h-8 flex items-center">
                <svg viewBox="0 0 50 16" className="h-4 w-auto">
                  <path fill="#1A1F71" d="M19.5 1.3L16 14.7h-3.2L16.3 1.3h3.2zm14.8 8.6l1.7-4.6.9 4.6h-2.6zm3.5 4.8h3l-2.6-13.4h-2.8c-.6 0-1.2.4-1.4.9L28 14.7h3.3l.7-1.8h4l.4 1.8h-.1zm-8.2-4.4c0-3.5-4.9-3.7-4.9-5.3 0-.5.5-1 1.5-1.1.5-.1 1.9-.1 3.5.6l.6-2.9c-.9-.3-2-.6-3.3-.6-3.5 0-5.9 1.8-6 4.5 0 1.9 1.8 3 3.1 3.7 1.4.7 1.8 1.1 1.8 1.7 0 .9-1.1 1.3-2.1 1.4-1.8 0-2.8-.5-3.6-.9l-.7 3c.8.4 2.3.7 3.9.7 3.7 0 6.1-1.8 6.2-4.8zM12.3 1.3L7 14.7H3.6L1 3.7c-.2-.6-.3-.8-.9-1C-.6 2.4.7 2.1.7 2.1l3.9.9.1.2 2.4 11.5h3.5L15.8 1.3h-3.5z"/>
                </svg>
              </motion.div>

              {/* Mastercard */}
              <motion.div whileHover={{ scale: 1.05, y: -2 }} className="bg-white rounded-md p-1.5 shadow-sm h-8 flex items-center">
                <svg viewBox="0 0 40 24" className="h-5 w-auto">
                  <circle fill="#EB001B" cx="12" cy="12" r="10"/>
                  <circle fill="#F79E1B" cx="28" cy="12" r="10"/>
                  <path fill="#FF5F00" d="M20 4.5a10 10 0 000 15 10 10 0 000-15z"/>
                </svg>
              </motion.div>

              {/* Amex */}
              <motion.div whileHover={{ scale: 1.05, y: -2 }} className="bg-[#006FCF] rounded-md p-1.5 shadow-sm h-8 flex items-center">
                <span className="text-white text-[10px] font-bold tracking-tight">AMEX</span>
              </motion.div>

              {/* Apple Pay */}
              <motion.div whileHover={{ scale: 1.05, y: -2 }} className="bg-black rounded-md p-1.5 shadow-sm h-8 flex items-center">
                <svg viewBox="0 0 50 20" className="h-4 w-auto">
                  <path fill="white" d="M9.4 4.8c-.6.7-1.5 1.3-2.4 1.2-.1-1 .4-2 .9-2.6.6-.7 1.5-1.2 2.3-1.3.1 1-.3 2-.8 2.7zm.8 1.4c-1.3-.1-2.5.8-3.1.8-.6 0-1.6-.7-2.7-.7-1.4 0-2.7.8-3.4 2.1-1.5 2.5-.4 6.3 1 8.4.7 1 1.5 2.2 2.6 2.1 1-.1 1.4-.7 2.7-.7 1.2 0 1.6.7 2.7.7 1.1 0 1.8-1 2.5-2.1.8-1.2 1.1-2.3 1.1-2.4-.1 0-2.2-.8-2.2-3.3 0-2.1 1.7-3.1 1.8-3.2-1-1.5-2.5-1.6-3-1.7z"/>
                  <path fill="white" d="M21.5 2.5c3.2 0 5.4 2.2 5.4 5.4 0 3.2-2.3 5.4-5.5 5.4h-3.5v5.6h-2.6V2.5h6.2zm-3.6 8.6h2.9c2.2 0 3.5-1.2 3.5-3.2s-1.3-3.2-3.5-3.2h-2.9v6.4zm10.3 3.9c0-2.1 1.6-3.4 4.4-3.5l3.3-.2v-.9c0-1.3-.9-2.1-2.4-2.1-1.4 0-2.3.7-2.5 1.7h-2.4c.1-2.2 2-3.8 5-3.8 2.9 0 4.8 1.5 4.8 3.9v8.2h-2.4v-2h-.1c-.7 1.4-2.2 2.2-3.8 2.2-2.4.1-3.9-1.4-3.9-3.5zm7.7-1v-1l-3 .2c-1.4.1-2.2.7-2.2 1.7s.9 1.7 2.1 1.7c1.7 0 3.1-1.1 3.1-2.6zm4.5 7.3v-2c.2 0 .6.1.8.1 1.2 0 1.8-.5 2.2-1.7l.2-.7-4.5-12.5h2.7l3.1 10.2h.1l3.1-10.2h2.6l-4.6 13.1c-1.1 3-2.3 4-4.9 4-.2-.1-.6-.2-.8-.3z"/>
                </svg>
              </motion.div>

              {/* Google Pay */}
              <motion.div whileHover={{ scale: 1.05, y: -2 }} className="bg-white rounded-md px-2.5 shadow-sm h-8 flex items-center gap-1">
                <span className="text-[#4285F4] text-[13px] font-bold leading-none">G</span>
                <span className="text-[#5F6368] text-[11px] font-semibold leading-none">Pay</span>
              </motion.div>

              {/* Klarna */}
              <motion.div whileHover={{ scale: 1.05, y: -2 }} className="bg-[#FFB3C7] rounded-md px-2.5 shadow-sm h-8 flex items-center">
                <span className="text-black text-[11px] font-bold tracking-tight">Klarna</span>
              </motion.div>

              {/* Swish */}
              <motion.div whileHover={{ scale: 1.05, y: -2 }} className="bg-white rounded-md px-2.5 shadow-sm h-8 flex items-center">
                <span className="text-[#E5007D] text-[11px] font-bold tracking-tight">Swish</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
