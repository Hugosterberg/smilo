import { Facebook, Instagram, Sparkles, Heart } from "lucide-react";
import { motion } from "framer-motion";
import smajlLogoFull from "@/assets/smajl-logo-full.png";

const Footer = () => {
  return (
    <footer className="bg-smajl-brown text-smajl-cream-light overflow-hidden">
      {/* Main Footer Content */}
      <div className="smajl-container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* About Section - Takes more space */}
          <motion.div 
            className="md:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
              Om oss <Sparkles className="w-5 h-5 text-smajl-gold" />
            </h3>
            <div className="space-y-4 text-smajl-cream/80 leading-relaxed">
              <p className="text-base italic">
                "Smajl föddes ur en enkel idé: att göra det lättare att vara närvarande i stunden."
              </p>
              <p className="text-sm">
                Vi älskar bilder, men märkte hur ofta mobilen tog över ögonblicket. 
                Därför skapade vi Smajl – en digital kamera utan skärm, som låter dig ta bilden och fortsätta leva.
              </p>
              <p className="text-sm flex items-center gap-2">
                <Heart className="w-4 h-4 text-smajl-gold fill-smajl-gold" />
                Designad i Sverige för vardag, fest och alla stunder däremellan.
              </p>
            </div>
            
            {/* Social Icons */}
            <div className="flex gap-4 mt-8">
              <motion.a 
                href="#" 
                className="w-10 h-10 rounded-full bg-smajl-cream/10 flex items-center justify-center text-smajl-cream/70 hover:bg-smajl-gold hover:text-smajl-brown transition-all"
                aria-label="Facebook"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a 
                href="#" 
                className="w-10 h-10 rounded-full bg-smajl-cream/10 flex items-center justify-center text-smajl-cream/70 hover:bg-smajl-gold hover:text-smajl-brown transition-all"
                aria-label="Instagram"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Customer Care Section */}
          <motion.div 
            className="md:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-display text-xl font-bold mb-6">Kundservice</h3>
            <ul className="space-y-3">
              {[
                "Spåra min order",
                "Vanliga frågor",
                "Frakt",
                "Returer & byten",
                "Kontakt"
              ].map((item, index) => (
                <motion.li 
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                >
                  <a 
                    href="#" 
                    className="text-sm text-smajl-cream/70 hover:text-smajl-gold transition-colors inline-block hover:translate-x-1 transform duration-200"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Section */}
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-display text-xl font-bold mb-6">Juridiskt</h3>
            <ul className="space-y-3">
              {[
                "Integritetspolicy",
                "Köpvillkor"
              ].map((item, index) => (
                <motion.li 
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                >
                  <a 
                    href="#" 
                    className="text-sm text-smajl-cream/70 hover:text-smajl-gold transition-colors inline-block hover:translate-x-1 transform duration-200"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
            
            {/* Safety info with playful styling */}
            <div className="mt-8 p-4 rounded-2xl bg-smajl-cream/5 border border-smajl-cream/10">
              <p className="text-xs text-smajl-cream/50">
                CE-märkt ✓
              </p>
              <p className="text-xs text-smajl-cream/50 mt-1">
                Ej lämplig för barn under 3 år
              </p>
            </div>
          </motion.div>

          {/* Logo Section */}
          <motion.div 
            className="md:col-span-2 flex flex-col items-center md:items-end justify-start"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.img 
              src={smajlLogoFull} 
              alt="Smajl" 
              className="h-20 w-auto brightness-110"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-smajl-cream/10">
        <div className="smajl-container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <motion.p 
              className="text-sm text-smajl-cream/50 flex items-center gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              © 2025 Smajl 
              <span className="inline-block">✨</span>
              <span className="text-smajl-cream/30">|</span>
              <span>Designad i Sverige</span>
            </motion.p>

            {/* Payment Icons */}
            <motion.div 
              className="flex items-center gap-2 flex-wrap justify-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {[
                { name: "Visa", bg: "bg-white", text: "text-[#1A1F71]" },
                { name: "Mastercard", bg: "bg-white", text: "text-[#EB001B]" },
                { name: "Amex", bg: "bg-white", text: "text-[#006FCF]" },
                { name: "Apple Pay", bg: "bg-black", text: "text-white" },
                { name: "Klarna", bg: "bg-[#FFB3C7]", text: "text-black" },
                { name: "Swish", bg: "bg-white", text: "text-[#00A041]" },
              ].map((payment) => (
                <motion.div 
                  key={payment.name}
                  className={`${payment.bg} rounded-md px-2 py-1 shadow-sm`}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <span className={`text-[10px] font-bold ${payment.text}`}>{payment.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;