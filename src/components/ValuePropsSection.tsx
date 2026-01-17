import { motion } from "framer-motion";
import { MonitorOff, Smartphone, HardDrive, BatteryCharging, Film, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

const valueProps = [
  {
    icon: MonitorOff,
    label: "Ingen skärm",
  },
  {
    icon: Smartphone,
    label: "Ingen kamerarulle",
  },
  {
    icon: HardDrive,
    label: "Förinstallerat lagring",
  },
  {
    icon: BatteryCharging,
    label: "Laddningsbart batteri",
  },
  {
    icon: Film,
    label: "Vintage filmstil",
  },
  {
    icon: Leaf,
    label: "Miljövänlig",
  },
];

const ValuePropsSection = () => {
  const scrollToProduct = () => {
    const productSection = document.getElementById('product');
    productSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 md:py-24 bg-smajl-cream">
      <div className="smajl-container">
        <motion.h2 
          className="font-handwritten text-3xl md:text-4xl text-smajl-brown text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Varför Smajl funkar
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-6 mb-12">
          {valueProps.map((prop, index) => (
            <motion.div
              key={prop.label}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 mb-4 flex items-center justify-center">
                <prop.icon 
                  className="w-12 h-12 md:w-14 md:h-14 text-smajl-brown stroke-[1.2]" 
                />
              </div>
              <p className="text-xs md:text-sm font-medium tracking-wider uppercase text-smajl-brown">
                {prop.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button 
            onClick={scrollToProduct}
            className="bg-smajl-olive hover:bg-smajl-olive/90 text-smajl-cream-light px-10 py-6 rounded-full text-base font-medium tracking-wide"
          >
            Shoppa nu
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ValuePropsSection;
