import { motion } from "framer-motion";
import { Camera, Clock, Heart, Cable } from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Mer närvaro",
    description: "Ingen skärm. Inga notiser. Bara du och stunden.",
  },
  {
    icon: Clock,
    title: "Minnen som känns",
    description: "Bilder med karaktär – inte perfekta, men äkta.",
  },
  {
    icon: Heart,
    title: "För vardag & fest",
    description: "Middagar, resor, stranddagar och sena kvällar.",
  },
  {
    icon: Cable,
    title: "Dina bilder, när du vill",
    description: "För över bilderna till mobilen när det passar dig.",
  },
];

const WhySmajlSection = () => {
  return (
    <section className="smajl-section bg-secondary/30">
      <div className="smajl-container">
        <motion.h2 
          className="smajl-heading-lg text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          Varför smajl?
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="smajl-card text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-smajl-coral-soft flex items-center justify-center">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl mb-3">{feature.title}</h3>
              <p className="smajl-body-sm text-muted-foreground">
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
