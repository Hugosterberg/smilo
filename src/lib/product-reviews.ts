import { unstable_noStore as noStore } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase";

type ProductReviewRow = {
  id: string;
  author_name: string;
  rating: number;
  title: string | null;
  body: string;
  created_at: string;
};

export type ProductReview = {
  id: string;
  authorName: string;
  rating: number;
  title: string | null;
  body: string;
  createdAt: string;
};

export type ProductReviewSummary = {
  items: ProductReview[];
  averageRating: number;
  reviewCount: number;
};

const EMPTY_SUMMARY: ProductReviewSummary = {
  items: [],
  averageRating: 0,
  reviewCount: 0,
};

export async function readProductReviews(): Promise<ProductReviewSummary> {
  noStore();

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return EMPTY_SUMMARY;
  }

  const { data, error } = await supabase
    .from("product_reviews")
    .select("id, author_name, rating, title, body, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error("Kunde inte läsa recensioner:", error);
    return EMPTY_SUMMARY;
  }

  const items = (data as ProductReviewRow[]).map((row) => ({
    id: row.id,
    authorName: row.author_name,
    rating: Math.min(5, Math.max(1, row.rating)),
    title: row.title,
    body: row.body,
    createdAt: row.created_at,
  }));

  const reviewCount = items.length;
  const averageRating =
    reviewCount === 0
      ? 0
      : Math.round((items.reduce((sum, item) => sum + item.rating, 0) / reviewCount) * 10) / 10;

  return { items, averageRating, reviewCount };
}

/** Opublicerade recensioner som väntar på granskning i admin. */
export async function readPendingReviews(): Promise<ProductReview[]> {
  noStore();

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("product_reviews")
    .select("id, author_name, rating, title, body, created_at")
    .eq("published", false)
    .order("created_at", { ascending: true });

  if (error || !data) {
    console.error("Kunde inte läsa väntande recensioner:", error);
    return [];
  }

  return (data as ProductReviewRow[]).map((row) => ({
    id: row.id,
    authorName: row.author_name,
    rating: Math.min(5, Math.max(1, row.rating)),
    title: row.title,
    body: row.body,
    createdAt: row.created_at,
  }));
}

export async function publishProductReview(id: string): Promise<{ ok: boolean }> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return { ok: false };

  const { error } = await supabase
    .from("product_reviews")
    .update({ published: true })
    .eq("id", id);

  if (error) {
    console.error("Kunde inte publicera recension:", error);
    return { ok: false };
  }
  return { ok: true };
}

export async function deleteProductReview(id: string): Promise<{ ok: boolean }> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return { ok: false };

  const { error } = await supabase.from("product_reviews").delete().eq("id", id);

  if (error) {
    console.error("Kunde inte radera recension:", error);
    return { ok: false };
  }
  return { ok: true };
}
