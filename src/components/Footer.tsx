import { Facebook, Instagram } from "lucide-react";
import smajlLogoIcon from "@/assets/smajl-logo-icon.png";

const Footer = () => {
  return (
    <footer className="bg-smajl-brown text-smajl-cream-light">
      {/* Main Footer Content */}
      <div className="smajl-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* About Section */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Om oss</h3>
            <p className="text-sm text-smajl-cream/70 leading-relaxed mb-6">
              Smajl föddes ur en enkel idé: att göra det lättare att vara närvarande i stunden.
            </p>
            <p className="text-sm text-smajl-cream/70 leading-relaxed mb-6">
              Vi älskar bilder, men märkte hur ofta mobilen tog över ögonblicket. 
              Därför skapade vi Smajl – en digital kamera utan skärm, som låter dig ta bilden och fortsätta leva.
            </p>
            <p className="text-sm text-smajl-cream/70 leading-relaxed mb-8">
              Smajl är designad i Sverige och skapad för vardag, fest och alla stunder däremellan. 
              För minnen som får kännas – inte bara sparas.
            </p>
            
            {/* Logo Icon */}
            <img 
              src={smajlLogoIcon} 
              alt="Smajl" 
              className="h-16 w-auto mb-6 brightness-110"
            />
            
            {/* Social Icons */}
            <div className="flex gap-4">
              <a 
                href="#" 
                className="text-smajl-cream/70 hover:text-smajl-cream transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-smajl-cream/70 hover:text-smajl-cream transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Customer Care Section */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Kundservice</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-smajl-cream/70 hover:text-smajl-cream transition-colors">
                  Spåra min order
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-smajl-cream/70 hover:text-smajl-cream transition-colors">
                  Vanliga frågor
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-smajl-cream/70 hover:text-smajl-cream transition-colors">
                  Frakt
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-smajl-cream/70 hover:text-smajl-cream transition-colors">
                  Returer & byten
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-smajl-cream/70 hover:text-smajl-cream transition-colors">
                  Integritetspolicy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-smajl-cream/70 hover:text-smajl-cream transition-colors">
                  Köpvillkor
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-smajl-cream/70 hover:text-smajl-cream transition-colors">
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          {/* Info Section */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Information</h3>
            <div className="space-y-3 text-sm text-smajl-cream/70">
              <p>Designad i Sverige</p>
              <p>CE-märkt</p>
              <p>Ej lämplig för barn under 3 år</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-smajl-cream/10">
        <div className="smajl-container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-sm text-smajl-cream/50">
              © 2025 Smajl
            </p>

            {/* Payment Icons */}
            <div className="flex items-center gap-2">
              <div className="bg-white rounded px-2 py-1">
                <span className="text-xs font-bold text-blue-600">VISA</span>
              </div>
              <div className="bg-white rounded px-2 py-1">
                <span className="text-xs font-bold text-red-500">MC</span>
              </div>
              <div className="bg-white rounded px-2 py-1">
                <span className="text-xs font-bold text-blue-800">AMEX</span>
              </div>
              <div className="bg-black rounded px-2 py-1">
                <span className="text-xs font-bold text-white">Apple Pay</span>
              </div>
              <div className="bg-white rounded px-2 py-1">
                <span className="text-xs font-bold text-[#003087]">Klarna</span>
              </div>
              <div className="bg-[#FFFC00] rounded px-2 py-1">
                <span className="text-xs font-bold text-black">Swish</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;