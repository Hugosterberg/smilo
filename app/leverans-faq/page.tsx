'use client'

import { motion } from "framer-motion";
import Link from "next/link";
import { Truck, ArrowLeft, Package, Clock, MapPin, RefreshCcw, CreditCard, HelpCircle, Mail } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const deliveryFaqs = [
  { icon: Truck, question: "Hur lång är leveranstiden?", answer: "Vi skickar din beställning inom 1-2 arbetsdagar. Normal leveranstid är 2-4 arbetsdagar inom Sverige. Du får en spårningslänk via e-post så fort paketet skickats." },
  { icon: CreditCard, question: "Vad kostar frakten?", answer: "Frakten kostar 49 kr inom Sverige. Returer är alltid kostnadsfria. Inga dolda avgifter, priset du ser är priset du betalar." },
  { icon: Package, question: "Hur skickas paketet?", answer: "Vi skickar med PostNord. Du kan välja att få paketet levererat till närmaste utlämningsställe eller direkt hem till dörren." },
  { icon: MapPin, question: "Kan jag spåra min leverans?", answer: "Ja! Så fort din beställning skickats får du ett mejl med spårningsinformation. Du kan följa paketets resa hela vägen till dig." },
  { icon: Clock, question: "Vad händer om jag inte är hemma vid leverans?", answer: "Oroa dig inte! Om du valt hemleverans och inte är hemma lämnas en avi, och paketet skickas till närmaste utlämningsställe. Du har 14 dagar på dig att hämta ut det." },
  { icon: RefreshCcw, question: "Hur gör jag om paketet är skadat?", answer: "Kontakta oss omedelbart om paketet eller produkten är skadad vid leverans. Fotografera skadan och mejla oss på info@smilo.se så löser vi det direkt." },
  { icon: MapPin, question: "Kan jag ändra leveransadress efter beställning?", answer: "Ja, om paketet inte skickats ännu! Kontakta oss så snart som möjligt på info@smilo.se med ditt ordernummer och den nya adressen." },
  { icon: Truck, question: "Skickar ni till hela Sverige?", answer: "Ja, vi skickar till alla adresser i Sverige. Leveranstiden kan vara något längre till mer avlägsna områden." },
  { icon: Package, question: "Skickar ni utomlands?", answer: "Just nu skickar vi endast inom Sverige. Vi hoppas kunna erbjuda internationell frakt längre fram!" },
  { icon: CreditCard, question: "Vilka betalningsmetoder accepterar ni?", answer: "Vi accepterar Swish, kortbetalning (Visa, Mastercard) och Klarna. Alla betalningar sker säkert och krypterat." },
];

export default function DeliveryFAQPage() {
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
            <Link href="/kontakt" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-smilo-brown transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              Tillbaka till kontakt
            </Link>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-smilo-olive/10 text-smilo-olive text-sm font-medium mb-6 ml-4">
              <Truck className="w-4 h-4" />
              Snabba svar
            </span>
            <h1 className="smilo-heading-xl text-smilo-brown mb-4">Frågor om leverans</h1>
            <p className="smilo-body text-muted-foreground">
              Allt du behöver veta om frakt, leverans och betalning.
              Vi vill att din upplevelse ska vara lika smidig som vår kamera!
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 border-y border-border bg-white/50">
        <div className="smilo-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Truck, title: "49 kr frakt", sub: "Inom Sverige", bg: "bg-smilo-olive/10", color: "text-smilo-olive" },
              { icon: Clock, title: "2-4 arbetsdagar", sub: "Snabb leverans", bg: "bg-smilo-gold/20", color: "text-smilo-brown" },
              { icon: RefreshCcw, title: "30 dagars öppet köp", sub: "Fri retur", bg: "bg-smilo-cream", color: "text-smilo-brown" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-smilo-brown">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="smilo-container max-w-3xl">
          <Accordion type="single" collapsible className="space-y-4">
            {deliveryFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <AccordionItem value={`faq-${index}`} className="bg-white rounded-2xl px-6 border-0 shadow-soft">
                  <AccordionTrigger className="hover:no-underline text-left py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-smilo-olive/10 flex items-center justify-center flex-shrink-0">
                        <faq.icon className="w-5 h-5 text-smilo-olive" />
                      </div>
                      <span className="font-semibold text-lg text-smilo-brown">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 pl-14 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>

          <motion.div
            className="mt-16 grid md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <Link href="/faq" className="flex items-center gap-4 p-6 rounded-2xl bg-smilo-cream hover:bg-smilo-gold/20 transition-all group border border-transparent hover:border-smilo-olive/20">
              <div className="w-14 h-14 rounded-xl bg-smilo-olive/10 flex items-center justify-center group-hover:bg-smilo-olive/20 transition-colors">
                <HelpCircle className="w-6 h-6 text-smilo-olive" />
              </div>
              <div>
                <h3 className="font-semibold text-smilo-brown text-lg">Fler frågor?</h3>
                <p className="text-muted-foreground">Se alla vanliga frågor</p>
              </div>
            </Link>
            <Link href="/kontakt" className="flex items-center gap-4 p-6 rounded-2xl bg-smilo-cream hover:bg-smilo-gold/20 transition-all group border border-transparent hover:border-smilo-olive/20">
              <div className="w-14 h-14 rounded-xl bg-smilo-olive/10 flex items-center justify-center group-hover:bg-smilo-olive/20 transition-colors">
                <Mail className="w-6 h-6 text-smilo-olive" />
              </div>
              <div>
                <h3 className="font-semibold text-smilo-brown text-lg">Behöver du mer hjälp?</h3>
                <p className="text-muted-foreground">Kontakta vår kundtjänst</p>
              </div>
            </Link>
          </motion.div>

          <motion.div className="mt-16 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <p className="text-muted-foreground mb-4">Redo att beställa?</p>
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
