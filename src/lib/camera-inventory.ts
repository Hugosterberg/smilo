import { unstable_noStore as noStore } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase";
import {
  CAMERA_COLORS,
  getUnavailableCameraInventory,
  type CameraColorId,
  type CameraInventoryItem,
} from "@/lib/camera-colors";

type CameraInventoryRow = {
  color_id: string;
  stock_quantity: number;
  version: number;
  updated_at: string | null;
};

type CameraInventoryResult = {
  items: CameraInventoryItem[];
  error?: string;
};

type CameraInventoryUpdate = {
  colorId: CameraColorId;
  stockQuantity: number;
  version: number;
};

type ReservationResult = {
  ok: boolean;
  error?: string;
};

function mergeInventoryRows(rows: CameraInventoryRow[] | null): CameraInventoryItem[] {
  const rowsByColorId = new Map(rows?.map((row) => [row.color_id, row]) ?? []);

  return CAMERA_COLORS.map((color) => {
    const row = rowsByColorId.get(color.id);
    return {
      ...color,
      stockQuantity: Math.max(0, Number(row?.stock_quantity ?? 0)),
      version: Math.max(1, Number(row?.version ?? 1)),
      updatedAt: row?.updated_at ?? null,
    };
  });
}

export async function readCameraInventory(): Promise<CameraInventoryResult> {
  noStore();

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return {
      items: getUnavailableCameraInventory(),
      error: "Supabase är inte konfigurerat för lagerhantering.",
    };
  }

  await supabase.rpc("release_expired_checkout_inventory");

  const { data, error } = await supabase
    .from("camera_inventory")
    .select("color_id, stock_quantity, version, updated_at");

  if (error) {
    console.error("Kunde inte läsa lagerstatus:", error);
    return {
      items: getUnavailableCameraInventory(),
      error: "Lagerstatus kunde inte hämtas från databasen.",
    };
  }

  return { items: mergeInventoryRows(data as CameraInventoryRow[]) };
}

export async function getCameraInventory(): Promise<CameraInventoryItem[]> {
  const { items } = await readCameraInventory();
  return items;
}

export async function updateCameraInventory(
  updates: CameraInventoryUpdate[]
): Promise<{ ok: boolean; error?: string }> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { ok: false, error: "Supabase är inte konfigurerat för lagerhantering." };
  }

  const payload = updates.map((update) => {
    return {
      color_id: update.colorId,
      stock_quantity: update.stockQuantity,
      version: update.version,
    };
  });

  const { error } = await supabase.rpc("set_camera_inventory", {
    p_updates: payload,
  });

  if (error) {
    console.error("Kunde inte uppdatera lagerstatus:", error);
    const stale = error.message?.toLocaleLowerCase("sv-SE").includes("stale stock version");
    return {
      ok: false,
      error: stale
        ? "Lagerstatusen har ändrats sedan sidan laddades. Uppdatera sidan och försök igen."
        : "Lagerstatus kunde inte sparas.",
    };
  }

  return { ok: true };
}

export async function reserveCameraInventory(
  reservationId: string,
  colorIds: CameraColorId[],
  expiresAt: Date
): Promise<ReservationResult> {
  if (colorIds.length === 0) {
    return { ok: false, error: "Ordern saknar färger att reservera." };
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { ok: false, error: "Supabase är inte konfigurerat för lagerhantering." };
  }

  const { error } = await supabase.rpc("reserve_camera_inventory", {
    p_reservation_id: reservationId,
    requested_color_ids: colorIds,
    p_expires_at: expiresAt.toISOString(),
  });

  if (error) {
    console.error("Kunde inte reservera lagersaldo:", error);
    return { ok: false, error: "Det finns inte tillräckligt många kameror kvar." };
  }

  return { ok: true };
}

export async function attachCheckoutSessionToReservation(
  reservationId: string,
  checkoutSessionId: string
): Promise<ReservationResult> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { ok: false, error: "Supabase är inte konfigurerat för lagerhantering." };
  }

  const { error } = await supabase.rpc("attach_checkout_session_to_reservation", {
    p_reservation_id: reservationId,
    p_checkout_session_id: checkoutSessionId,
  });

  if (error) {
    console.error("Kunde inte koppla checkout-session till reservation:", error);
    return { ok: false, error: "Lagerreservationen kunde inte kopplas till kassan." };
  }

  return { ok: true };
}

export async function releaseCheckoutInventory(
  checkoutSessionId: string | null,
  reservationId: string | null
): Promise<ReservationResult & { released?: boolean }> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { ok: false, error: "Supabase är inte konfigurerat för lagerhantering." };
  }

  const { data, error } = await supabase.rpc("release_checkout_inventory", {
    p_checkout_session_id: checkoutSessionId,
    p_reservation_id: reservationId,
  });

  if (error) {
    console.error("Kunde inte släppa lagerreservation:", error);
    return { ok: false, error: "Lagerreservationen kunde inte släppas." };
  }

  return { ok: true, released: data === true };
}

export async function decrementCameraInventory(
  colorIds: CameraColorId[]
): Promise<{ ok: boolean; error?: string }> {
  if (colorIds.length === 0) {
    return { ok: true };
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { ok: false, error: "Supabase är inte konfigurerat för lagerhantering." };
  }

  const { error } = await supabase.rpc("decrement_camera_inventory", {
    requested_color_ids: colorIds,
  });

  if (error) {
    console.error("Kunde inte minska lagersaldo efter order:", error);
    return { ok: false, error: "Lagersaldo kunde inte minskas efter order." };
  }

  return { ok: true };
}

export async function claimCheckoutInventory(
  checkoutSessionId: string,
  reservationId: string | null,
  colorIds: CameraColorId[]
): Promise<{ ok: boolean; alreadyProcessed?: boolean; error?: string }> {
  if (colorIds.length === 0) {
    return { ok: false, error: "Ordern saknar färger att dra från lager." };
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { ok: false, error: "Supabase är inte konfigurerat för lagerhantering." };
  }

  const { data, error } = await supabase.rpc("claim_checkout_inventory", {
    p_checkout_session_id: checkoutSessionId,
    p_reservation_id: reservationId,
    requested_color_ids: colorIds,
  });

  if (error) {
    console.error("Kunde inte claima checkout och minska lagersaldo:", error);
    return { ok: false, error: "Lagersaldo kunde inte minskas efter order." };
  }

  return { ok: true, alreadyProcessed: data === false };
}
