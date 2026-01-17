import SmajlLogo from "./SmajlLogo";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="smajl-container">
        <nav className="flex items-center justify-between h-16">
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            <SmajlLogo className="h-8 w-auto" />
          </a>
          <a
            href="#produkt"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Köp kamera
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
