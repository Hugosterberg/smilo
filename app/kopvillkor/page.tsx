'use client'

import { motion } from "framer-motion";
import Link from "next/link";
import { ScrollText } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const sections: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "1. Allmänt",
    body: (
      <p>
        Dessa köpvillkor gäller för köp på smilo.se mellan dig som kund och Smilo (&quot;vi&quot;, &quot;oss&quot;).
        Genom att slutföra ett köp godkänner du villkoren. Du måste vara minst 18 år eller ha målsmans tillstånd
        för att handla hos oss.
        <br />
        <span className="text-sm text-muted-foreground">[Komplettera gärna med fullständigt företagsnamn, organisationsnummer och postadress.]</span>
      </p>
    ),
  },
  {
    heading: "2. Priser",
    body: (
      <p>
        Alla priser anges i svenska kronor (SEK) och inklusive moms. Vi reserverar oss för eventuella pris- och
        tryckfel. Skulle ett pris vara uppenbart felaktigt har vi rätt att neka eller annullera beställningen.
      </p>
    ),
  },
  {
    heading: "3. Beställning och avtal",
    body: (
      <p>
        När du lagt din beställning får du en orderbekräftelse via e-post. Avtal sluts först när vi bekräftat din
        order. Vi förbehåller oss rätten att i enskilda fall neka eller begränsa en beställning.
      </p>
    ),
  },
  {
    heading: "4. Betalning",
    body: (
      <p>
        Betalning sker säkert via vår betalleverantör Stripe. Vi erbjuder kortbetalning (Visa, Mastercard,
        American Express), Apple Pay, Google Pay, Klarna och Swish. Vilka alternativ som visas i kassan kan variera.
        Betalning dras i samband med att köpet genomförs.
      </p>
    ),
  },
  {
    heading: "5. Leverans",
    body: (
      <p>
        Vi skickar din beställning inom 1–2 arbetsdagar och normal leveranstid är 2–4 arbetsdagar inom Sverige.
        Frakten kostar 49 kr inom Sverige och vi skickar med PostNord. När paketet skickats får du en spårningslänk via e-post.
        Läs mer under <Link href="/leverans-faq" className="text-smilo-olive hover:underline">frakt &amp; leverans</Link>.
      </p>
    ),
  },
  {
    heading: "6. Ångerrätt",
    body: (
      <p>
        Du har enligt distansavtalslagen 14 dagars ångerrätt från det att du tagit emot varan. Utöver detta erbjuder
        vi 30 dagars öppet köp. Varan ska returneras i väsentligen oförändrat skick. Meddela oss att du vill ångra
        köpet på <a href="mailto:info@smilo.se" className="text-smilo-olive hover:underline">info@smilo.se</a>.
      </p>
    ),
  },
  {
    heading: "7. Returer och återbetalning",
    body: (
      <p>
        Vi bjuder på returfrakten. När vi tagit emot och kontrollerat din retur betalar vi tillbaka köpesumman till
        samma betalmetod, normalt inom 14 dagar. Steg för steg hittar du på vår{" "}
        <Link href="/returer" className="text-smilo-olive hover:underline">retursida</Link>.
      </p>
    ),
  },
  {
    heading: "8. Reklamation och garanti",
    body: (
      <p>
        Du har enligt konsumentköplagen rätt att reklamera fel på varan i upp till tre år. Upptäcker du ett fel,
        kontakta oss så snart som möjligt på <a href="mailto:info@smilo.se" className="text-smilo-olive hover:underline">info@smilo.se</a>{" "}
        med ditt ordernummer och en beskrivning, gärna med foto. Vid godkänd reklamation står vi för frakten.
      </p>
    ),
  },
  {
    heading: "9. Force majeure",
    body: (
      <p>
        Vi ansvarar inte för förseningar eller fel som beror på omständigheter utanför vår kontroll, såsom
        arbetskonflikt, myndighetsbeslut, naturhändelser eller störningar hos transportör eller underleverantör.
      </p>
    ),
  },
  {
    heading: "10. Tvist",
    body: (
      <p>
        Skulle en tvist uppstå följer vi i första hand Allmänna reklamationsnämndens (ARN) rekommendationer. Du kan
        också använda EU-kommissionens onlineplattform för tvistlösning på{" "}
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-smilo-olive hover:underline">ec.europa.eu/consumers/odr</a>.
        Svensk lag tillämpas på köpet.
      </p>
    ),
  },
  {
    heading: "11. Kontakt",
    body: (
      <p>
        Har du frågor om dessa villkor är du varmt välkommen att höra av dig till{" "}
        <a href="mailto:info@smilo.se" className="text-smilo-olive hover:underline">info@smilo.se</a>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="smilo-page-hero pb-10 sm:pb-14 bg-gradient-to-b from-smilo-cream to-background">
        <div className="smilo-container">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-smilo-olive/10 text-smilo-olive text-sm font-medium mb-6">
              <ScrollText className="w-4 h-4" />
              Trygg handel
            </span>
            <h1 className="smilo-heading-xl text-smilo-brown mb-4">Köpvillkor</h1>
            <p className="smilo-body text-muted-foreground">
              Villkoren för att handla hos Smilo: betalning, leverans, ångerrätt och dina rättigheter som kund.
            </p>
            <p className="text-sm text-muted-foreground mt-4">Senast uppdaterad: 28 maj 2026</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="smilo-container max-w-3xl">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-card space-y-8">
            {sections.map((section, i) => (
              <motion.div
                key={section.heading}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.02 }}
              >
                <h2 className="font-display text-xl font-bold text-smilo-brown mb-3">{section.heading}</h2>
                <div className="text-muted-foreground leading-relaxed">{section.body}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
