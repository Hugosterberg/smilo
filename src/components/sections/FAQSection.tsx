'use client'

import Link from "next/link";
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

        <p className="smilo-body-sm mt-8 text-center text-smilo-brown-light">
          Fler frågor?{" "}
          <Link
            href="/faq"
            className="font-semibold text-smilo-brown underline decoration-smilo-flash/50 underline-offset-4 transition-colors hover:text-smilo-olive"
          >
            Se alla vanliga frågor
          </Link>{" "}
          eller{" "}
          <Link
            href="/kontakt"
            className="font-semibold text-smilo-brown underline decoration-smilo-flash/50 underline-offset-4 transition-colors hover:text-smilo-olive"
          >
            kontakta oss
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

export default FAQSection;
