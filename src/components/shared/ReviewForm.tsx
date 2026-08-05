'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, CheckCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const RATING_LABELS = ["Dålig", "Okej", "Bra", "Mycket bra", "Utmärkt"] as const;

export function ReviewForm() {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (name.trim().length < 2) {
      setError("Ange ditt namn.");
      return;
    }
    if (body.trim().length < 10) {
      setError("Skriv minst 10 tecken i din recension.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          title: title.trim() || undefined,
          rating,
          body: body.trim(),
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error ?? "Kunde inte skicka recensionen.");
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Något gick fel. Försök igen om en stund.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 text-center shadow-soft">
        <CheckCircle className="mx-auto mb-3 h-9 w-9 text-smilo-olive" aria-hidden />
        <p className="font-semibold text-smilo-brown">Tack för din recension!</p>
        <p className="smilo-body-sm mt-1 text-smilo-brown-light">
          Vi granskar den och publicerar den inom kort.
        </p>
      </div>
    );
  }

  if (!open) {
    return (
      <div className="text-center">
        <Button variant="cream" size="lg" onClick={() => setOpen(true)}>
          Lämna en recension
        </Button>
      </div>
    );
  }

  const activeRating = hoverRating ?? rating;

  return (
    <AnimatePresence>
      <motion.form
        onSubmit={handleSubmit}
        className="mx-auto max-w-xl space-y-4 rounded-2xl bg-white p-5 shadow-soft sm:p-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="font-heading text-lg font-semibold text-smilo-brown">
          Lämna en recension
        </p>

        <div className="space-y-2">
          <Label>Betyg</Label>
          <div
            className="flex items-center gap-1.5"
            role="radiogroup"
            aria-label="Betyg, 1 till 5 stjärnor"
            onMouseLeave={() => setHoverRating(null)}
          >
            {Array.from({ length: 5 }).map((_, index) => {
              const value = index + 1;
              return (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={rating === value}
                  aria-label={`${value} av 5 stjärnor`}
                  onClick={() => setRating(value)}
                  onMouseEnter={() => setHoverRating(value)}
                  className="rounded p-0.5 transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-smilo-flash"
                >
                  <Star
                    aria-hidden
                    className={`h-7 w-7 ${
                      value <= activeRating
                        ? "fill-current text-smilo-gold"
                        : "text-smilo-brown/20"
                    }`}
                  />
                </button>
              );
            })}
            <span className="ml-2 text-sm text-smilo-brown-light">
              {RATING_LABELS[activeRating - 1]}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="review-name">Namn</Label>
          <Input
            id="review-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={80}
            required
            autoComplete="name"
            placeholder="Ditt namn"
            className="bg-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="review-title">
            Rubrik <span className="font-normal text-muted-foreground">(valfri)</span>
          </Label>
          <Input
            id="review-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={120}
            placeholder="Sammanfatta med några ord"
            className="bg-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="review-body">Recension</Label>
          <Textarea
            id="review-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={1000}
            required
            rows={4}
            placeholder="Berätta vad du tycker om kameran"
            className="bg-white"
          />
        </div>

        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            Recensionen granskas innan den publiceras.
          </p>
          <Button type="submit" disabled={isSubmitting}>
            <Send className="h-4 w-4" aria-hidden />
            {isSubmitting ? "Skickar…" : "Skicka recension"}
          </Button>
        </div>
      </motion.form>
    </AnimatePresence>
  );
}
