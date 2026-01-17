import SmajlLogo from "./SmajlLogo";

const Footer = () => {
  return (
    <footer className="smajl-section bg-foreground text-primary-foreground">
      <div className="smajl-container">
        {/* Logo and info */}
        <div className="text-center mb-8">
          <SmajlLogo className="h-10 w-auto mx-auto mb-6 text-primary-foreground" />
          <p className="smajl-body-sm text-primary-foreground/70">
            Designad i Sverige. Tillverkad i Kina.
          </p>
        </div>

        {/* Legal info */}
        <div className="text-center mb-8">
          <p className="text-sm text-primary-foreground/50 mb-2">
            CE-märkt.
          </p>
          <p className="text-sm text-primary-foreground/50">
            Ej lämplig för barn under 3 år.
          </p>
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 border-t border-primary-foreground/10">
          <p className="text-sm text-primary-foreground/50">
            © smajl
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
