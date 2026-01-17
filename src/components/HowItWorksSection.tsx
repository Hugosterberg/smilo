import { motion } from "framer-motion";

const HowItWorksSection = () => {
  return (
    <section className="smajl-section bg-secondary/30">
      <div className="smajl-container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="smajl-heading-lg mb-4">Så fungerar det</h2>
          <p className="smajl-body text-muted-foreground">
            För över bilder till mobilen
          </p>
        </motion.div>

        {/* Main explanation card */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="smajl-card">
            <p className="text-lg font-display text-center mb-8 text-primary">
              Enkelt. Inga appar. Inget konto.
            </p>

            {/* Steps */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">1</span>
                <p className="smajl-body pt-1">Koppla kameran till mobilen med USB-C-kabel</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">2</span>
                <p className="smajl-body pt-1">Öppna Filer på mobilen</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">3</span>
                <p className="smajl-body pt-1">Ladda ner bilderna</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">4</span>
                <p className="smajl-body pt-1">Radera bilderna direkt medan kameran är inkopplad</p>
              </div>
            </div>
            
            <div className="pt-6 border-t border-border">
              <p className="text-sm font-medium mb-4">Kompatibilitet</p>
              <div className="space-y-2 mb-6">
                <p className="smajl-body-sm text-muted-foreground">
                  • Android & iPhone med USB-C: fungerar direkt
                </p>
                <p className="smajl-body-sm text-muted-foreground">
                  • iPhone 14 eller äldre: kräver adapter (kan köpas hos oss)
                </p>
              </div>
              <p className="smajl-body-sm text-muted-foreground">
                Det gör att du när som helst kan få över alla bilder till mobilen.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
