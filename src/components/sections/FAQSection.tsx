'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/faqs";

const FAQSection = () => {
  return (
    <section className="smilo-section bg-smilo-cream">
      <div className="smilo-container max-w-2xl">
        <h2 className="smilo-heading-lg text-center mb-4 text-smilo-brown">Vanliga frågor</h2>
        <div className="smilo-accent-bar mb-12" />

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="bg-card rounded-xl sm:rounded-2xl px-4 sm:px-6 border-0 shadow-soft"
            >
              <AccordionTrigger className="font-semibold text-base sm:text-lg hover:no-underline text-left py-4 sm:py-5 text-smilo-brown">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="smilo-body-sm text-smilo-brown-light pb-5">
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
