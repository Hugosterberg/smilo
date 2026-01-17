import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const specs = [
  { label: "Sensor", value: "12 MP CMOS-sensor" },
  { label: "Blixt", value: "LED & xenonblixt" },
  { label: "Filter", value: "Flera filterlägen" },
  { label: "Lagring", value: "Minneskort medföljer" },
  { label: "Anslutning", value: "USB-C" },
  { label: "Vikt", value: "Ca 95 g" },
  { label: "Mått", value: "Ca 115 × 65 × 34 mm" },
];

const TechnicalSection = () => {
  return (
    <section className="smajl-section">
      <div className="smajl-container max-w-2xl">
        <Accordion type="single" collapsible>
          <AccordionItem value="specs" className="border-border">
            <AccordionTrigger className="font-display text-xl hover:no-underline">
              Teknisk information
            </AccordionTrigger>
            <AccordionContent>
              <div className="pt-4 space-y-3">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex justify-between py-2 border-b border-border last:border-0"
                  >
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span className="font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default TechnicalSection;
