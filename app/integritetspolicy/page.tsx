'use client'

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const sections: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "1. Personuppgiftsansvarig",
    body: (
      <p>
        Smilo (&quot;vi&quot;, &quot;oss&quot;) är personuppgiftsansvarig för behandlingen av dina
        personuppgifter på smilo.se. Har du frågor om hur vi hanterar dina uppgifter når du oss på{" "}
        <a href="mailto:info@smilo.se" className="text-smilo-olive hover:underline">info@smilo.se</a>.
        <br />
        <span className="text-sm text-muted-foreground">[Komplettera gärna med fullständigt företagsnamn, organisationsnummer och postadress.]</span>
      </p>
    ),
  },
  {
    heading: "2. Vilka uppgifter vi samlar in",
    body: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Kontakt- och leveransuppgifter: namn, e-post, leveransadress och eventuellt telefonnummer.</li>
        <li>Orderuppgifter: vad du köpt, ordernummer, belopp och orderhistorik.</li>
        <li>Betalningsinformation: hanteras säkert av vår betalleverantör Stripe, vi lagrar aldrig fullständiga kortuppgifter.</li>
        <li>Teknisk information: t.ex. enhet och cookies när du besöker webbplatsen (se punkt 6).</li>
        <li>Meddelanden du skickar till oss via kontaktformulär eller e-post.</li>
      </ul>
    ),
  },
  {
    heading: "3. Varför vi behandlar uppgifterna och laglig grund",
    body: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li><strong>Fullgöra ditt köp</strong>: hantera order, betalning och leverans (laglig grund: fullgörande av avtal).</li>
        <li><strong>Kundservice</strong>: svara på frågor och hantera returer och reklamationer (berättigat intresse/avtal).</li>
        <li><strong>Bokföring</strong>: spara underlag enligt lag (rättslig förpliktelse).</li>
        <li><strong>Marknadsföring</strong>: nyhetsbrev och erbjudanden endast om du samtyckt (samtycke, som du när som helst kan återkalla).</li>
      </ul>
    ),
  },
  {
    heading: "4. Hur länge vi sparar uppgifterna",
    body: (
      <p>
        Vi sparar dina uppgifter så länge det behövs för ändamålet de samlades in för. Orderuppgifter som
        utgör bokföringsunderlag sparas i sju år enligt bokföringslagen. Uppgifter för nyhetsbrev sparas tills
        du avregistrerar dig.
      </p>
    ),
  },
  {
    heading: "5. Vem vi delar uppgifter med",
    body: (
      <>
        <p className="mb-2">
          Vi säljer aldrig dina uppgifter. För att kunna leverera vår tjänst delar vi uppgifter med utvalda
          personuppgiftsbiträden som behandlar uppgifterna för vår räkning:
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>Stripe</strong>: betalningshantering.</li>
          <li><strong>PostNord</strong>: leverans av ditt paket.</li>
          <li><strong>Resend</strong>: utskick av order- och leveransmejl.</li>
        </ul>
        <p className="mt-2">
          Vissa leverantörer kan behandla uppgifter utanför EU/EES. I sådana fall säkerställer vi att överföringen
          skyddas med lämpliga skyddsåtgärder, t.ex. EU-kommissionens standardavtalsklausuler.
        </p>
      </>
    ),
  },
  {
    heading: "6. Cookies",
    body: (
      <p>
        Vi använder cookies för att webbplatsen ska fungera och för att förbättra din upplevelse. Du kan blockera
        cookies i din webbläsares inställningar, men vissa funktioner kan då sluta fungera.
      </p>
    ),
  },
  {
    heading: "7. Dina rättigheter",
    body: (
      <>
        <p className="mb-2">Enligt dataskyddsförordningen (GDPR) har du rätt att:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>få tillgång till de uppgifter vi har om dig,</li>
          <li>begära rättelse av felaktiga uppgifter,</li>
          <li>begära radering (&quot;rätten att bli bortglömd&quot;),</li>
          <li>invända mot eller begära begränsning av behandlingen,</li>
          <li>begära dataportabilitet, och</li>
          <li>återkalla lämnat samtycke.</li>
        </ul>
        <p className="mt-2">
          Kontakta oss på <a href="mailto:info@smilo.se" className="text-smilo-olive hover:underline">info@smilo.se</a> för
          att utöva dina rättigheter. Du har även rätt att lämna klagomål till Integritetsskyddsmyndigheten (IMY).
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
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
              <ShieldCheck className="w-4 h-4" />
              Din integritet
            </span>
            <h1 className="smilo-heading-xl text-smilo-brown mb-4">Integritetspolicy</h1>
            <p className="smilo-body text-muted-foreground">
              Här beskriver vi hur vi samlar in, använder och skyddar dina personuppgifter när du handlar hos Smilo.
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
                transition={{ duration: 0.4, delay: i * 0.03 }}
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
