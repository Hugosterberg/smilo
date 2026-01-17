import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Är smajl en engångskamera?",
    answer:
      "Nej, smajl är en digital kamera som du kan använda om och om igen. Du laddar ner bilderna till din mobil och kan sedan ta nya.",
  },
  {
    question: "Kan jag se bilderna direkt?",
    answer:
      "Nej, kameran har ingen skärm – det är hela poängen! Du ser bilderna först när du kopplar in kameran till din mobil. Det gör upplevelsen lite mer spännande och nostalgisk.",
  },
  {
    question: "Funkar den med iPhone och Android?",
    answer:
      "Ja! Alla mobiler med USB-C-port fungerar direkt. iPhone 14 eller äldre (med Lightning-port) kräver en USB-C-adapter som säljs separat.",
  },
  {
    question: "Behöver jag en app?",
    answer:
      "Nej, ingen app behövs. Du kopplar bara in kameran och öppnar Filer-appen på din mobil för att ladda ner bilderna.",
  },
  {
    question: "Är den bra i mörker?",
    answer:
      "Kameran har både LED- och xenonblixt som hjälper till i mörkare miljöer. Resultatet blir ofta charmigt och nostalgiskt – precis som gamla flashbilder.",
  },
  {
    question: "Vad skiljer den från mobilen?",
    answer:
      "Med smajl tar du bilden och återgår till stunden – inga notiser, ingen scrollning, ingen distraction. Du upplever mer och ser bilderna senare.",
  },
  {
    question: "Kan jag radera bilder direkt från mobilen?",
    answer:
      "Ja! När kameran är inkopplad kan du både ladda ner och radera bilder direkt från Filer-appen.",
  },
  {
    question: "Vad händer om jag vill returnera?",
    answer:
      "Vi erbjuder fri retur inom 30 dagar. Skicka tillbaka kameran i originalskick så återbetalar vi hela köpesumman.",
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
