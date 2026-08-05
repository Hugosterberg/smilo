"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  clearAdminSession,
  isAdminAuthenticated,
  setAdminSession,
  verifyAdminPassword,
} from "@/lib/admin-auth";
import { CAMERA_COLORS, type CameraColorId } from "@/lib/camera-colors";
import { updateCameraInventory } from "@/lib/camera-inventory";
import { deleteProductReview, publishProductReview } from "@/lib/product-reviews";

function adminRedirect(params: Record<string, string>): never {
  const search = new URLSearchParams(params);
  redirect(`/admin?${search.toString()}`);
}

export async function loginAdmin(formData: FormData): Promise<void> {
  const password = String(formData.get("password") ?? "");

  if (!verifyAdminPassword(password)) {
    adminRedirect({ error: "login" });
  }

  await setAdminSession();
  adminRedirect({ status: "logged-in" });
}

export async function logoutAdmin(): Promise<void> {
  await clearAdminSession();
  redirect("/admin");
}

export async function saveCameraInventory(formData: FormData): Promise<void> {
  if (!(await isAdminAuthenticated())) {
    adminRedirect({ error: "session" });
  }

  const updates = CAMERA_COLORS.map((color) => {
    const rawValue = String(formData.get(`stock-${color.id}`) ?? "");
    if (rawValue.trim() === "") {
      adminRedirect({ error: "stock" });
    }

    const stockQuantity = Number(rawValue);
    const version = Number(formData.get(`version-${color.id}`));

    if (
      !Number.isInteger(stockQuantity) ||
      stockQuantity < 0 ||
      stockQuantity > 9999 ||
      !Number.isInteger(version) ||
      version < 1
    ) {
      adminRedirect({ error: "stock" });
    }

    return {
      colorId: color.id as CameraColorId,
      stockQuantity,
      version,
    };
  });

  const result = await updateCameraInventory(updates);
  if (!result.ok) {
    adminRedirect({ error: result.error?.includes("ändrats") ? "stale" : "save" });
  }

  revalidatePath("/");
  revalidatePath("/admin");
  adminRedirect({ status: "saved" });
}

function getReviewId(formData: FormData): string {
  const id = String(formData.get("reviewId") ?? "").trim();
  if (!id) {
    adminRedirect({ error: "review" });
  }
  return id;
}

export async function approveReview(formData: FormData): Promise<void> {
  if (!(await isAdminAuthenticated())) {
    adminRedirect({ error: "session" });
  }

  const result = await publishProductReview(getReviewId(formData));
  if (!result.ok) {
    adminRedirect({ error: "review" });
  }

  revalidatePath("/");
  revalidatePath("/admin");
  adminRedirect({ status: "review-approved" });
}

export async function rejectReview(formData: FormData): Promise<void> {
  if (!(await isAdminAuthenticated())) {
    adminRedirect({ error: "session" });
  }

  const result = await deleteProductReview(getReviewId(formData));
  if (!result.ok) {
    adminRedirect({ error: "review" });
  }

  revalidatePath("/admin");
  adminRedirect({ status: "review-deleted" });
}
