import { Camera, Smile, Smartphone } from "lucide-react";

const steps = [
  {
    icon: Camera,
    step: "1",
    title: "Ta bilden",
  },
  {
    icon: Smile,
    step: "2",
    title: "Lev i stunden",
  },
  {
    icon: Smartphone,
    step: "3",
    title: "För över till mobilen senare",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="smajl-section bg-secondary/30">
      <div className="smajl-container">
        <h2 className="smajl-heading-lg text-center mb-16">Så funkar det</h2>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={step.step} className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-smajl-coral-soft flex items-center justify-center relative">
                <step.icon className="w-10 h-10 text-primary" />
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                  {step.step}
                </span>
              </div>
              <h3 className="font-display text-xl">{step.title}</h3>
              
              {/* Arrow between steps (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Explanation */}
        <div className="max-w-2xl mx-auto text-center">
          <div className="smajl-card">
            <p className="smajl-body text-muted-foreground mb-4">
              Anslut kameran till mobilen med USB-C-kabel.
            </p>
            <p className="smajl-body text-muted-foreground mb-4">
              Öppna Filer på mobilen och ladda ner bilderna.
            </p>
            <p className="smajl-body text-muted-foreground mb-6">
              Du kan även radera bilder direkt medan kameran är inkopplad för att tömma minneskortet.
            </p>
            
            <div className="pt-6 border-t border-border">
              <p className="smajl-body-sm text-muted-foreground mb-2">
                <strong>Android</strong> och <strong>iPhone med USB-C</strong> fungerar direkt.
              </p>
              <p className="smajl-body-sm text-muted-foreground mb-4">
                iPhone 14 eller äldre kräver adapter (säljs separat).
              </p>
              <p className="text-sm font-medium text-primary">
                No app. No konto. No moln.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
