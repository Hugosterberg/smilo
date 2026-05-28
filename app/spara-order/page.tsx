'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Package, Mail, Truck, Search, ExternalLink, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const steps = [
  {
    icon: Mail,
    title: "1. Orderbekräftelse",
    text: "Direkt efter köpet får du en orderbekräftelse via e-post med en sammanfattning av din beställning.",
  },
  {
    icon: Package,
    title: "2. Vi packar & skickar",
    text: "Vi skickar din kamera inom 1–2 arbetsdagar. När paketet lämnar oss får du ett mejl med en spårningslänk.",
  },
  {
    icon: Truck,
    title: "3. Följ paketet",
    text: "Klicka på länken i mejlet, eller ange ditt kollinummer hos PostNord, för att se var paketet befinner sig.",
  },
];

export default function TrackOrderPage() {
  const [trackingId, setTrackingId] = useState("");

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const id = trackingId.trim();
    const url = id
      ? `https://tracking.postnord.com/se/?id=${encodeURIComponent(id)}`
      : "https://tracking.postnord.com/se/";
    window.open(url, "_blank", "noopener,noreferrer");
  };

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
              <Package className="w-4 h-4" />
              Var är mitt paket?
            </span>
            <h1 className="smilo-heading-xl text-smilo-brown mb-4">Spåra din order</h1>
            <p className="smilo-body text-muted-foreground">
              Vi skickar inom 1–2 arbetsdagar och normal leveranstid är 2–4 arbetsdagar inom Sverige.
              Så fort paketet skickats får du en spårningslänk via e-post.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="smilo-container max-w-3xl">
          <motion.form
            onSubmit={handleTrack}
            className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-display font-bold text-smilo-brown mb-2">
              Spåra hos PostNord
            </h2>
            <p className="text-muted-foreground mb-6">
              Ange kollinumret från ditt leveransmejl så öppnar vi spårningen hos PostNord.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="T.ex. 00370725600000000000"
                aria-label="Kollinummer"
                className="flex-1"
              />
              <Button type="submit" size="lg" className="shrink-0">
                <Search className="w-4 h-4 mr-2" />
                Spåra paket
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4 flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              Du skickas vidare till PostNords spårningssida i en ny flik.
            </p>
          </motion.form>

          <div className="mt-12 grid gap-4 sm:gap-6">
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
            className="mt-12 grid md:grid-cols-2 gap-6"
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
                <p className="text-muted-foreground">Allt om frakt och leverans</p>
              </div>
            </Link>
            <Link href="/kontakt" className="flex items-center gap-4 p-6 rounded-2xl bg-smilo-cream hover:bg-smilo-gold/20 transition-all group border border-transparent hover:border-smilo-olive/20">
              <div className="w-14 h-14 rounded-xl bg-smilo-olive/10 flex items-center justify-center group-hover:bg-smilo-olive/20 transition-colors">
                <HelpCircle className="w-6 h-6 text-smilo-olive" />
              </div>
              <div>
                <h3 className="font-semibold text-smilo-brown text-lg">Hittar du inte ditt paket?</h3>
                <p className="text-muted-foreground">Mejla oss ditt ordernummer så hjälper vi dig</p>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
