import smajlLogoFull from "@/assets/smajl-logo-full.png";

const Footer = () => {
  return (
    <footer className="smajl-section bg-smajl-brown text-smajl-cream-light">
      <div className="smajl-container">
        {/* Logo and info */}
        <div className="text-center mb-8">
          <img 
            src={smajlLogoFull} 
            alt="smajl" 
            className="h-24 w-auto mx-auto mb-8 brightness-110"
          />
          <p className="smajl-body-sm text-smajl-cream/70">
            Designad i Sverige. Tillverkad i Kina.
          </p>
        </div>

        {/* Legal info */}
        <div className="text-center mb-8">
          <p className="text-sm text-smajl-cream/50 mb-2">
            CE-märkt.
          </p>
          <p className="text-sm text-smajl-cream/50">
            Ej lämplig för barn under 3 år.
          </p>
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 border-t border-smajl-cream/10">
          <p className="text-sm text-smajl-cream/50">
            © smajl
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
