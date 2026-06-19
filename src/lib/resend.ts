import { Resend } from "resend";

let cachedResend: Resend | null = null;

export type ResendEmailPayload = Parameters<Resend["emails"]["send"]>[0];

export function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;

  if (!cachedResend) {
    cachedResend = new Resend(apiKey);
  }

  return cachedResend;
}
