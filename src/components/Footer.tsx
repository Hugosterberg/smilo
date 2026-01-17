import SmajlLogo from "./SmajlLogo";
import { AlertTriangle, Recycle, Trash2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="smajl-section bg-foreground text-primary-foreground">
      <div className="smajl-container">
        {/* Logo and info */}
        <div className="text-center mb-12">
          <SmajlLogo className="h-10 w-auto mx-auto mb-6 text-primary-foreground" />
          <p className="smajl-body-sm text-primary-foreground/70 mb-2">
            Tillverkad i Kina
          </p>
          <p className="smajl-body-sm text-primary-foreground/70">
            Designad i Sverige
          </p>
        </div>

        {/* Icons */}
        <div className="flex justify-center gap-8 mb-12">
          {/* CE Mark */}
          <div className="text-center">
            <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center">
              <span className="text-xl font-bold">CE</span>
            </div>
            <p className="text-xs text-primary-foreground/50">CE-märkt</p>
          </div>
          
          {/* WEEE */}
          <div className="text-center">
            <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center">
              <Recycle className="w-6 h-6" />
            </div>
            <p className="text-xs text-primary-foreground/50">Återvinning</p>
          </div>
          
          {/* Not household waste */}
          <div className="text-center">
            <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>
            <p className="text-xs text-primary-foreground/50">Ej hushållsavfall</p>
          </div>
          
          {/* Not for children */}
          <div className="text-center">
            <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <p className="text-xs text-primary-foreground/50">Ej under 3 år</p>
          </div>
        </div>

        {/* Warning */}
        <p className="text-center text-sm text-primary-foreground/50 mb-8">
          ⚠️ Ej lämplig för barn under 3 år
        </p>

        {/* Copyright */}
        <div className="text-center pt-8 border-t border-primary-foreground/10">
          <p className="text-sm text-primary-foreground/50">
            © {new Date().getFullYear()} smajl™ • Alla rättigheter förbehållna
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
