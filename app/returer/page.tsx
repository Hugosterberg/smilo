'use client'

import { motion } from "framer-motion";
import Link from "next/link";
import { RotateCcw, Mail, PackageCheck, Banknote, CheckCircle2, Repeat, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const highlights = [
  { icon: RotateCcw, title: "Fria returer", sub: "Vi står för returfrakten", bg: "bg-smilo-olive/10", color: "text-smilo-olive" },
  { icon: CheckCircle2, title: "30 dagars öppet köp", sub: "Gott om tid att bestämma dig", bg: "bg-smilo-gold/20", color: "text-smilo-brown" },
  { icon: Banknote, title: "Snabb återbetalning", sub: "Inom 14 dagar efter retur", bg: "bg-smilo-cream", color: "text-smilo-brown" },
];

const steps = [
  {
    icon: Mail,
    title: "1. Hör av dig",
    text: "Mejla oss på info@smilo.se med ditt ordernummer så skickar vi en kostnadsfri returfraktsedel till dig.",
  },
  {
    icon: PackageCheck,
    title: "2. Packa produkten",
    text: "Lägg kameran med tillbehör i originalförpackningen, helst i samma skick som du fick den.",
  },
  {
    icon: Truck,
    title: "3. Lämna in paketet",
    text: "Fäst fraktsedeln och lämna paketet hos närmaste PostNord-ombud. Behåll kvittot tills allt är klart.",
  },
  {
    icon: Banknote,
    title: "4. Få pengarna tillbaka",
    text: "Så fort vi tagit emot och kontrollerat returen betalar vi tillbaka till samma betalmetod, normalt inom 14 dagar.",
  },
];

export default function ReturnsPage() {
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
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-smilo-olive/10 text-smilo-olive text-sm font-medium mb-6">
              <RotateCcw className="w-4 h-4" />
              Tryggt & enkelt
            </span>
            <h1 className="smilo-heading-xl text-smilo-brown mb-4">Returer & byten</h1>
            <p className="smilo-body text-muted-foreground">
              Inte helt nöjd? Ingen fara. Du har 30 dagars öppet köp och vi bjuder på returfrakten –
              så att du kan handla med ro i magen.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 border-y border-border bg-white/50">
        <div className="smilo-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {highlights.map((item, i) => (
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
          <motion.h2
            className="text-2xl sm:text-3xl font-display font-bold text-smilo-brown mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Så här gör du en retur
          </motion.h2>

          <div className="grid gap-4 sm:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                className="flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-white shadow-soft"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl bg-smilo-olive/10 flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-5 h-5 text-smilo-olive" />
                </div>
                <div>
                  <h3 className="font-semibold text-smilo-brown text-lg">{step.title}</h3>
                  <p className="text-muted-foreground">{step.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-10 rounded-2xl bg-smilo-cream p-6 sm:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <h3 className="font-display text-xl font-bold text-smilo-brown mb-3 flex items-center gap-2">
              <Repeat className="w-5 h-5 text-smilo-olive" />
              Vill du byta färg?
            </h3>
            <p className="text-muted-foreground">
              Vill du byta till en annan färg eller variant? Mejla oss på{" "}
              <a href="mailto:info@smilo.se" className="text-smilo-olive hover:underline">info@smilo.se</a>{" "}
              så hjälper vi dig att byta – enklast är att returnera din kamera och lägga en ny beställning.
            </p>
          </motion.div>

          <motion.div
            className="mt-8 text-sm text-muted-foreground space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="font-semibold text-smilo-brown">Bra att veta</p>
            <p>
              Utöver vårt öppna köp har du alltid 14 dagars lagstadgad ångerrätt enligt distansavtalslagen.
              Produkten ska returneras i väsentligen oförändrat skick. Spåra-kort, sigill eller förpackning
              som öppnats påverkar inte din rätt att ångra köpet.
            </p>
            <p>
              Är produkten felaktig eller skadad? Då gäller reklamationsrätt – kontakta oss så löser vi det,
              läs mer i våra <Link href="/kopvillkor" className="text-smilo-olive hover:underline">köpvillkor</Link>.
            </p>
          </motion.div>

          <motion.div className="mt-12 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <p className="text-muted-foreground mb-4">Redo att starta en retur?</p>
            <Button size="lg" asChild>
              <Link href="/kontakt">Kontakta kundtjänst</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
