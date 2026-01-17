import { Camera, Cable, CreditCard } from "lucide-react";

const items = [
  {
    icon: Camera,
    title: "Kamera",
  },
  {
    icon: Cable,
    title: "USB-C-kabel",
  },
  {
    icon: CreditCard,
    title: "Minneskort",
  },
];

const WhatsIncludedSection = () => {
  return (
    <section className="smajl-section bg-secondary/30">
      <div className="smajl-container">
        <h2 className="smajl-heading-lg text-center mb-12">Detta ingår</h2>
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {items.map((item) => (
            <div key={item.title} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-card shadow-soft flex items-center justify-center">
                <item.icon className="w-8 h-8 text-foreground" />
              </div>
              <p className="font-medium">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatsIncludedSection;
