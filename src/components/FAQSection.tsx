import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Är detta en engångskamera?",
    answer: "Nej. smajl är digital och kan användas om och om igen.",
  },
  {
    question: "Kan jag se bilderna direkt?",
    answer: "Nej. Kameran har ingen skärm – medvetet.",
  },
  {
    question: "Fungerar den med iPhone och Android?",
    answer: "Ja. Android och nyare iPhone fungerar direkt. Äldre iPhone kräver adapter.",
  },
  {
    question: "Behöver jag ladda ner en app?",
    answer: "Nej. Allt sker via mobilens filhanterare.",
  },
  {
    question: "Kan jag radera bilderna från mobilen?",
    answer: "Ja, medan kameran är inkopplad.",
  },
  {
    question: "Hur funkar retur?",
    answer: "Fri retur inom Sverige.",
  },
];

const FAQSection = () => {
  return (
    <section className="smajl-section bg-secondary/30">
      <div className="smajl-container max-w-2xl">
        <h2 className="smajl-heading-lg text-center mb-12">Vanliga frågor</h2>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="bg-card rounded-2xl px-6 border-0 shadow-soft"
            >
              <AccordionTrigger className="font-display text-lg hover:no-underline text-left py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="smajl-body-sm text-muted-foreground pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
