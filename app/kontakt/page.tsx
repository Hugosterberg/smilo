'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Mail,
  MessageCircle,
  Send,
  MapPin,
  CheckCircle,
  HelpCircle,
  Package,
  RotateCcw,
  Sparkles,
  Truck
} from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Namn krävs").max(100, "Namnet får max vara 100 tecken"),
  email: z.string().trim().email("Ogiltig e-postadress").max(255, "E-postadressen får max vara 255 tecken"),
  subject: z.string().trim().min(1, "Ämne krävs").max(200, "Ämnet får max vara 200 tecken"),
  message: z.string().trim().min(10, "Meddelandet måste vara minst 10 tecken").max(2000, "Meddelandet får max vara 2000 tecken"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const quickLinks = [
  {
    icon: HelpCircle,
    title: "Vanliga frågor",
    description: "Hitta svar på de vanligaste frågorna",
    href: "/faq",
  },
  {
    icon: Package,
    title: "Spåra din order",
    description: "Se var ditt paket befinner sig",
    href: "#",
  },
  {
    icon: RotateCcw,
    title: "Returer & byten",
    description: "30 dagars öppet köp",
    href: "#",
  },
];

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);

    toast({
      title: "Meddelande skickat! ✨",
      description: "Vi återkommer till dig så snart vi kan.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-smilo-cream to-background">
        <div className="smilo-container">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-smilo-gold/20 text-smilo-brown text-sm font-medium mb-6">
              <MessageCircle className="w-4 h-4" />
              Vi finns här för dig
            </span>
            <h1 className="smilo-heading-xl text-smilo-brown mb-4">Kontakta oss</h1>
            <p className="smilo-body text-muted-foreground">
              Har du frågor om din beställning, produkten eller något annat?
              Vi svarar vanligtvis inom 24 timmar.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 border-y border-border bg-white/50">
        <div className="smilo-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickLinks.map((link, index) => (
              <motion.a
                key={link.title}
                href={link.href}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white hover:bg-smilo-cream/50 transition-all group border border-transparent hover:border-smilo-olive/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-12 h-12 rounded-xl bg-smilo-olive/10 flex items-center justify-center group-hover:bg-smilo-olive/20 transition-colors">
                  <link.icon className="w-5 h-5 text-smilo-olive" />
                </div>
                <div>
                  <h3 className="font-semibold text-smilo-brown">{link.title}</h3>
                  <p className="text-sm text-muted-foreground">{link.description}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="smilo-container">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-3xl p-6 md:p-10 shadow-card">
                {isSubmitted ? (
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="w-20 h-20 rounded-full bg-smilo-olive/10 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-smilo-olive" />
                    </div>
                    <h2 className="text-2xl font-display font-bold text-smilo-brown mb-3">
                      Tack för ditt meddelande!
                    </h2>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                      Vi har tagit emot ditt meddelande och återkommer till dig så snart vi kan,
                      vanligtvis inom 24 timmar.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ name: "", email: "", subject: "", message: "" });
                      }}
                    >
                      Skicka ett nytt meddelande
                    </Button>
                  </motion.div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h2 className="text-2xl font-display font-bold text-smilo-brown mb-2">
                        Skicka ett meddelande
                      </h2>
                      <p className="text-muted-foreground">
                        Fyll i formuläret så hör vi av oss så snart vi kan.
                      </p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Namn *</Label>
                          <Input
                            id="name" name="name" placeholder="Ditt namn"
                            value={formData.name} onChange={handleChange}
                            className={errors.name ? "border-destructive" : ""}
                          />
                          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">E-post *</Label>
                          <Input
                            id="email" name="email" type="email" placeholder="din@email.se"
                            value={formData.email} onChange={handleChange}
                            className={errors.email ? "border-destructive" : ""}
                          />
                          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Ämne *</Label>
                        <Input
                          id="subject" name="subject" placeholder="Vad gäller ditt ärende?"
                          value={formData.subject} onChange={handleChange}
                          className={errors.subject ? "border-destructive" : ""}
                        />
                        {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Meddelande *</Label>
                        <Textarea
                          id="message" name="message"
                          placeholder="Beskriv ditt ärende så detaljerat som möjligt..."
                          rows={6} value={formData.message} onChange={handleChange}
                          className={errors.message ? "border-destructive" : ""}
                        />
                        {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                      </div>
                      <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                            />
                            Skickar...
                          </>
                        ) : (
                          <><Send className="w-4 h-4 mr-2" />Skicka meddelande</>
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-smilo-olive/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-smilo-olive" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-smilo-brown mb-1">E-post</h3>
                    <a href="mailto:hej@smilo.se" className="text-smilo-olive hover:underline">
                      hej@smilo.se
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">Vi svarar vanligtvis inom 24 timmar</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-smilo-cream flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-smilo-brown" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-smilo-brown mb-1">Plats</h3>
                    <p className="text-muted-foreground">Gävle, Sverige</p>
                    <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Designat & skeppat med kärlek
                    </p>
                  </div>
                </div>
              </div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                <Link
                  href="/leverans-faq"
                  className="block bg-gradient-to-br from-smilo-olive to-smilo-olive-dark rounded-2xl p-6 text-white shadow-card hover:shadow-hover transition-shadow"
                >
                  <Truck className="w-8 h-8 mb-4 opacity-80" />
                  <h3 className="font-display text-xl font-bold mb-2">Behöver du snabbt svar?</h3>
                  <p className="text-white/80 text-sm">
                    Kolla in vanliga frågor om leverans – kanske hittar du svaret direkt!
                  </p>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
