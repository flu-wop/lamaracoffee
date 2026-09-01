import { getDb } from "@/lib/db";
import { getSquareClient } from "@/lib/square";
import { Resend } from "resend";

export type CheckResult = { status: "ok" | "warn" | "error"; detail: string };

// ---- Env Var Status ----
const REQUIRED_ENV_VARS = [
  "SQUARE_ACCESS_TOKEN",
  "SQUARE_LOCATION_ID",
  "SQUARE_ENVIRONMENT",
  "NEXT_PUBLIC_SQUARE_APPLICATION_ID",
  "NEXT_PUBLIC_SQUARE_LOCATION_ID",
  "NEXT_PUBLIC_SQUARE_ENVIRONMENT",
  "TURSO_DATABASE_URL",
  "TURSO_AUTH_TOKEN",
  "RESEND_API_KEY",
  "RESEND_FROM_EMAIL",
  "RESEND_TO_EMAIL",
  "ADMIN_PASSWORD",
];

export function checkEnvVars(): Record<string, CheckResult> {
  const results: Record<string, CheckResult> = {};
  for (const key of REQUIRED_ENV_VARS) {
    const present = !!process.env[key];
    results[key] = { status: present ? "ok" : "error", detail: present ? "set" : "MISSING" };
  }
  return results;
}

// ---- Checkout backend (Square) ----
export async function checkSquareCheckout(): Promise<CheckResult> {
  if (!process.env.SQUARE_ACCESS_TOKEN || !process.env.SQUARE_LOCATION_ID) {
    return { status: "error", detail: "SQUARE_ACCESS_TOKEN or SQUARE_LOCATION_ID not set" };
  }
  try {
    const square = getSquareClient();
    const resp = await square.locationsApi.retrieveLocation(process.env.SQUARE_LOCATION_ID);
    const loc = resp.result.location;
    const env = process.env.SQUARE_ENVIRONMENT === "production" ? "production" : "sandbox";
    return {
      status: "ok",
      detail: `Connected to "${loc?.name ?? process.env.SQUARE_LOCATION_ID}" (${env})`,
    };
  } catch (err) {
    return { status: "error", detail: `Square API error: ${(err as Error).message}` };
  }
}

// ---- Order email (Resend) ----
export async function checkResend(): Promise<CheckResult> {
  if (!process.env.RESEND_API_KEY) return { status: "error", detail: "RESEND_API_KEY not set" };
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const domains = await resend.domains.list();
    const fromDomain = (process.env.RESEND_FROM_EMAIL || "").split("@")[1];
    if (!fromDomain || fromDomain === "resend.dev") {
      return { status: "warn", detail: "Using resend.dev fallback — real domain not verified yet" };
    }
    type ResendDomain = { name: string; status: string };
    const match = (domains.data?.data as ResendDomain[] | undefined)?.find((d) => d.name === fromDomain);
    if (!match) return { status: "error", detail: `Domain ${fromDomain} not found in Resend account` };
    if (match.status !== "verified") return { status: "error", detail: `Domain status: ${match.status}` };
    return { status: "ok", detail: `${fromDomain} verified` };
  } catch (err) {
    return { status: "error", detail: `Resend API error: ${(err as Error).message}` };
  }
}

// ---- Order database (Turso) ----
export async function checkTurso(): Promise<CheckResult> {
  if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
    return { status: "error", detail: "TURSO_DATABASE_URL or TURSO_AUTH_TOKEN not set" };
  }
  try {
    const db = getDb();
    const result = await db.execute("SELECT COUNT(*) as c, MAX(created_at) as last FROM orders");
    const row = result.rows[0];
    return {
      status: "ok",
      detail: `Connected — ${row?.c ?? 0} orders recorded, last at ${row?.last ?? "n/a"}`,
    };
  } catch (err) {
    return { status: "error", detail: `Turso connection failed: ${(err as Error).message}` };
  }
}

// ---- Menu data source ----
// Not an integration check — a standing reminder that the menu is a
// static file, not pulled live from Square's catalog, and checkout line
// items are ad-hoc (not mapped to real catalog variation IDs). Orders
// land in Square correctly for kitchen/payment purposes, but won't
// decrement Square inventory or show up in catalog-level sales reports.
export function checkMenuDataSource(): CheckResult {
  return {
    status: "warn",
    detail:
      "Static file (src/lib/menu-data.ts), ad-hoc order line items — not mapped to Square catalog IDs. Re-verify manually if Lamara changes prices or items; inventory/reporting in Square Dashboard won't reflect these sales.",
  };
}
