'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer' }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? 'Något gick fel. Försök igen.');
        return;
      }

      toast.success('Tack! Du är nu anmäld till nyhetsbrevet.');
      setEmail('');
    } catch {
      toast.error('Något gick fel. Försök igen.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center sm:text-left"
    >
      <h3 className="font-display text-lg sm:text-xl font-bold mb-2 flex items-center justify-center sm:justify-start gap-2">
        Nyhetsbrev <Mail className="w-4 h-4 text-smilo-gold shrink-0" />
      </h3>
      <p className="text-sm text-smilo-cream/70 mb-4 text-balance max-w-xs mx-auto sm:mx-0">
        Få nyheter, erbjudanden och inspiration från Smilo direkt i inkorgen.
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto sm:mx-0"
      >
        <label htmlFor="newsletter-email" className="sr-only">
          E-postadress
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="din@email.se"
          disabled={isLoading}
          className="flex-1 min-w-0 rounded-full bg-smilo-cream/10 border border-smilo-cream/15 px-4 py-2.5 text-sm text-smilo-cream-light placeholder:text-smilo-cream/40 focus:outline-none focus:border-smilo-gold focus:ring-1 focus:ring-smilo-gold transition-colors disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="smilo-shine shrink-0 rounded-full bg-smilo-gold text-smilo-brown font-semibold text-sm px-5 py-2.5 hover:brightness-105 active:scale-95 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
              Skickar…
            </>
          ) : (
            'Anmäl mig'
          )}
        </button>
      </form>
    </motion.div>
  );
}
