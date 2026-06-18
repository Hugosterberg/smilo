import { createHash, createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "smilo_admin_session";
const ADMIN_SESSION_VALUE = "smilo-admin-v1";
const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8;

function getAdminPassword(): string | undefined {
  return process.env.SMILO_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD;
}

function hash(value: string): Buffer {
  return createHash("sha256").update(value).digest();
}

function sign(value: string): string | undefined {
  const password = getAdminPassword();
  if (!password) return undefined;
  return createHmac("sha256", password).update(value).digest("hex");
}

export function isAdminPasswordConfigured(): boolean {
  return Boolean(getAdminPassword());
}

export function verifyAdminPassword(value: string): boolean {
  const password = getAdminPassword();
  if (!password) return false;

  return timingSafeEqual(hash(value), hash(password));
}

export async function setAdminSession(): Promise<void> {
  const signature = sign(ADMIN_SESSION_VALUE);
  if (!signature) return;

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, `${ADMIN_SESSION_VALUE}.${signature}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: ADMIN_SESSION_MAX_AGE,
    path: "/admin",
  });
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/admin",
  });
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const expectedSignature = sign(ADMIN_SESSION_VALUE);
  if (!expectedSignature) return false;

  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!session) return false;

  const [value, signature] = session.split(".");
  if (value !== ADMIN_SESSION_VALUE || !signature) return false;

  return timingSafeEqual(hash(signature), hash(expectedSignature));
}
