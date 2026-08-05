'use client'

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { ProductReviewSummary } from "@/lib/product-reviews";

const MAX_VISIBLE_REVIEWS = 6;

const formatReviewDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString("sv-SE", { month: "long", year: "numeric" });

const StarRow = ({ rating, className }: { rating: number; className?: string }) => (
  <div className={`flex items-center gap-0.5 ${className ?? ""}`} aria-label={`${rating} av 5 stjärnor`}>
    {Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        aria-hidden
        className={`h-4 w-4 shrink-0 ${
          index < Math.round(rating) ? "fill-current text-smilo-gold" : "text-smilo-brown/20"
        }`}
      />
    ))}
  </div>
);

interface ReviewsSectionProps {
  reviews: ProductReviewSummary;
}

const ReviewsSection = ({ reviews }: ReviewsSectionProps) => {
  if (reviews.reviewCount === 0) {
    return null;
  }

  return (
    <section id="recensioner" className="smilo-section smilo-scroll-anchor bg-smilo-cream">
      <div className="smilo-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center sm:mb-12"
        >
          <h2 className="smilo-heading-lg mb-4 text-smilo-brown">Vad kunderna säger</h2>
          <motion.div
            className="smilo-accent-bar"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <div className="flex items-center justify-center gap-2">
            <StarRow rating={reviews.averageRating} />
            <p className="smilo-body-sm text-smilo-brown-light">
              {reviews.averageRating.toLocaleString("sv-SE")} av 5 ·{" "}
              {reviews.reviewCount === 1 ? "1 recension" : `${reviews.reviewCount} recensioner`}
            </p>
          </div>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {reviews.items.slice(0, MAX_VISIBLE_REVIEWS).map((review, index) => (
            <motion.blockquote
              key={review.id}
              className="flex flex-col rounded-2xl bg-white p-5 shadow-soft"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
            >
              <StarRow rating={review.rating} className="mb-3" />
              {review.title && (
                <p className="mb-1 font-semibold text-smilo-brown">{review.title}</p>
              )}
              <p className="smilo-body-sm flex-1 text-smilo-brown-light">{review.body}</p>
              <footer className="mt-4 text-xs text-muted-foreground">
                <span className="font-medium text-smilo-brown">{review.authorName}</span>
                {" · "}
                {formatReviewDate(review.createdAt)}
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
