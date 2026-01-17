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
    <section className="smajl-section bg-background">
      <div className="smajl-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="smajl-heading-lg mb-4 text-smajl-brown">Detta ingår</h2>
          <motion.div
            className="w-16 h-1 bg-smajl-gold mx-auto mb-4 rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
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
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-smajl-cream shadow-soft flex items-center justify-center">
                <item.icon className="w-10 h-10 text-smajl-olive" />
              </div>
              <p className="font-semibold text-smajl-brown">{item.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatsIncludedSection;
