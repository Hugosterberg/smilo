import smajlWordmark from "@/assets/smajl-logo-wordmark.png";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="smajl-container">
        <nav className="flex items-center justify-between h-16 md:h-20">
          <a href="#" className="transition-transform hover:scale-105">
            <img 
              src={smajlWordmark} 
              alt="smajl" 
              className="h-8 md:h-10 w-auto"
            />
          </a>
          <a
            href="#produkt"
            className="text-sm font-semibold uppercase tracking-wider text-foreground hover:text-primary transition-colors"
          >
            Köp kamera
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
