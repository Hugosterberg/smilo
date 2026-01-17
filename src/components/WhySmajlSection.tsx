import { motion } from "framer-motion";
import { Camera, Heart, Sparkles, Smartphone } from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Mer närvaro",
    description: "Utan skärm finns inget att kontrollera. Du är där – på riktigt.",
  },
  {
    icon: Heart,
    title: "Minnen med känsla",
    description: "Bilderna blir inte perfekta. De blir personliga.",
  },
  {
    icon: Sparkles,
    title: "För vardag & fest",
    description: "Middagar, resor, kvällar, spontana stunder.",
  },
  {
    icon: Smartphone,
    title: "Till mobilen när du vill",
    description: "Alla bilder kan enkelt föras över när det passar dig.",
  },
];

const WhySmajlSection = () => {
  return (
    <section id="varfor-smajl" className="smajl-section bg-smajl-cream scroll-mt-20">
      <div className="smajl-container">
        <motion.h2 
          className="smajl-heading-lg text-center mb-4 text-smajl-brown"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          Varför välja Smajl?
        </motion.h2>
        
        <motion.div
          className="w-16 h-1 bg-smajl-gold mx-auto mb-16 rounded-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-center p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-smajl-olive/10 flex items-center justify-center">
                <feature.icon className="w-8 h-8 text-smajl-olive" />
              </div>
              <h3 className="font-semibold text-xl mb-3 text-smajl-brown">{feature.title}</h3>
              <p className="smajl-body-sm text-smajl-brown-light">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySmajlSection;
