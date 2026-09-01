import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { initDb } from "@/lib/db";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import {
  checkEnvVars,
  checkSquareCheckout,
  checkResend,
  checkTurso,
  checkMenuDataSource,
} from "@/lib/health-checks";

function safeEq(a: string, b: string) {
  const A = Buffer.from(a);
  const B = Buffer.from(b);
  return A.length === B.length && timingSafeEqual(A, B);
}

export async function GET(req: NextRequest) {
  if (!process.env.ADMIN_PASSWORD) {
    // Fail closed: an unset ADMIN_PASSWORD must never mean "open to anyone".
    return NextResponse.json(
      { error: "ADMIN_PASSWORD not configured in this environment yet." },
      { status: 503 }
    );
  }

  // initDb() also creates rate_limits — safe even before TURSO is checked below.
  try {
    await initDb();
    const ok = await rateLimit(`admin-login:${clientIp(req)}`, 5, 900); // 5 per 15 min
    if (!ok) return NextResponse.json({ error: "Too many attempts" }, { status: 429 });
  } catch {
    // Turso not configured yet — allow login through so the panel can still
    // report that fact, rather than locking James out of diagnosing it.
  }

  const auth = req.headers.get("x-admin-password") ?? "";
  if (!safeEq(auth, process.env.ADMIN_PASSWORD)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [envVars, squareCheckout, resend, turso, menuDataSource] = await Promise.all([
    Promise.resolve(checkEnvVars()),
    checkSquareCheckout(),
    checkResend(),
    checkTurso(),
    Promise.resolve(checkMenuDataSource()),
  ]);

  return NextResponse.json({
    envVars,
    checkoutBackend: squareCheckout,
    email: resend,
    database: turso,
    menuDataSource,
    checkedAt: new Date().toISOString(),
  });
}
