'use client'

import { motion } from "framer-motion";
import Link from "next/link";
import { HelpCircle, ArrowLeft, Mail, Truck } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const faqs = [
  {
    category: "Om produkten",
    questions: [
      { question: "Är detta en engångskamera?", answer: "Nej. Smilo är digital och kan användas om och om igen. Du behöver aldrig köpa ny film eller betala för framkallning." },
      { question: "Kan jag se bilderna direkt?", answer: "Nej. Kameran har ingen skärm, helt medvetet. Det skapar en mer genuin upplevelse där du fokuserar på ögonblicket istället för att granska varje bild." },
      { question: "Hur många bilder får plats?", answer: "Kameran levereras med ett 4GB minneskort som rymmer ca 1300 bilder. Behöver du mer lagring? Kameran stöder minneskort upp till 16GB (ca 5000 bilder). När minnet är fullt kopplar du enkelt upp kameran till din telefon och överför bilderna." },
      { question: "Vilken upplösning har bilderna?", answer: "Bilderna tas i 12 MP, skarpt nog för sociala medier och utskrifter, men med den där varma retrokänslan i färgerna." },
    ],
  },
  {
    category: "Kompatibilitet",
    questions: [
      { question: "Fungerar den med iPhone och Android?", answer: "Ja. Android och nyare iPhone (med USB-C) fungerar direkt. Äldre iPhone med Lightning-kontakt kräver en adapter som du kan lägga till vid köp." },
      { question: "Behöver jag ladda ner en app?", answer: "Nej. Allt sker via mobilens inbyggda filhanterare. Koppla in kameran och dra över bilderna, enkelt som det ska vara." },
      { question: "Kan jag radera bilderna från mobilen?", answer: "Ja, medan kameran är inkopplad kan du hantera bilderna precis som vilken USB-enhet som helst: radera, kopiera eller flytta." },
    ],
  },
  {
    category: "Batteri & laddning",
    questions: [
      { question: "Hur länge håller batteriet?", answer: "Batteriet räcker till ca 200-300 bilder per laddning, beroende på hur ofta du använder blixt." },
      { question: "Hur laddar jag kameran?", answer: "Kameran laddas via USB-C. En full laddning tar ungefär 2 timmar." },
    ],
  },
  {
    category: "Köp & retur",
    questions: [
      { question: "Hur funkar retur?", answer: "Vi erbjuder fri retur inom 30 dagar. Om du inte är nöjd, kontakta oss så ordnar vi en retursedel." },
      { question: "Får jag rabatt om jag köper flera?", answer: "Ja! Vi erbjuder mängdrabatt: 2 kameror för 1349 kr (spara 449 kr), 3 kameror för 1899 kr (spara 798 kr) eller 5 kameror för 2995 kr (spara 1500 kr)." },
      { question: "Finns det garanti?", answer: "Ja, alla kameror har 12 månaders garanti mot tillverkningsfel." },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="smilo-page-hero pb-12 sm:pb-16 md:pb-20 bg-gradient-to-b from-smilo-cream to-background">
        <div className="smilo-container">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-smilo-brown transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              Tillbaka till startsidan
            </Link>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-smilo-gold/20 text-smilo-brown text-sm font-medium mb-6">
              <HelpCircle className="w-4 h-4" />
              Vi hjälper dig
            </span>
            <h1 className="smilo-heading-xl text-smilo-brown mb-4">Vanliga frågor</h1>
            <p className="smilo-body text-muted-foreground">
              Här hittar du svar på de vanligaste frågorna om Smilo-kameran.
              Hittar du inte svaret? Kontakta oss så hjälper vi dig!
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="smilo-container max-w-4xl">
          <div className="space-y-12">
            {faqs.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
              >
                <h2 className="text-xl font-display font-bold text-smilo-brown mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-smilo-olive/10 flex items-center justify-center text-sm text-smilo-olive font-semibold">
                    {categoryIndex + 1}
                  </span>
                  {category.category}
                </h2>
                <Accordion type="single" collapsible className="space-y-3">
                  {category.questions.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`${category.category}-${index}`}
                      className="bg-white rounded-xl sm:rounded-2xl px-4 sm:px-6 border-0 shadow-soft"
                    >
                      <AccordionTrigger className="font-semibold text-base sm:text-lg hover:no-underline text-left py-4 sm:py-5 text-smilo-brown">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-16 grid md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <Link href="/leverans-faq" className="flex items-center gap-4 p-6 rounded-2xl bg-smilo-cream hover:bg-smilo-gold/20 transition-all group border border-transparent hover:border-smilo-olive/20">
              <div className="w-14 h-14 rounded-xl bg-smilo-olive/10 flex items-center justify-center group-hover:bg-smilo-olive/20 transition-colors">
                <Truck className="w-6 h-6 text-smilo-olive" />
              </div>
              <div>
                <h3 className="font-semibold text-smilo-brown text-lg">Frågor om leverans?</h3>
                <p className="text-muted-foreground">Se alla frågor om frakt och leverans</p>
              </div>
            </Link>
            <Link href="/kontakt" className="flex items-center gap-4 p-6 rounded-2xl bg-smilo-cream hover:bg-smilo-gold/20 transition-all group border border-transparent hover:border-smilo-olive/20">
              <div className="w-14 h-14 rounded-xl bg-smilo-olive/10 flex items-center justify-center group-hover:bg-smilo-olive/20 transition-colors">
                <Mail className="w-6 h-6 text-smilo-olive" />
              </div>
              <div>
                <h3 className="font-semibold text-smilo-brown text-lg">Hittar du inte svaret?</h3>
                <p className="text-muted-foreground">Kontakta oss så hjälper vi dig</p>
              </div>
            </Link>
          </motion.div>

          <motion.div className="mt-16 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <p className="text-muted-foreground mb-4">Redo att fånga minnena?</p>
            <Button size="lg" asChild>
              <Link href="/#produkt">Köp Smilo-kameran</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
