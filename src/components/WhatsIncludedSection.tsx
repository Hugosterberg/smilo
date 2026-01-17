import { motion } from "framer-motion";
import { Camera, Cable, CreditCard } from "lucide-react";

const items = [
  {
    icon: Camera,
    title: "smajl retro kamera",
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="smajl-heading-lg mb-4">Detta ingår</h2>
          <p className="smajl-body-sm text-muted-foreground mb-12">
            Redo att använda direkt.
          </p>
        </motion.div>
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-card shadow-soft flex items-center justify-center">
                <item.icon className="w-8 h-8 text-foreground" />
              </div>
              <p className="font-medium">{item.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatsIncludedSection;
