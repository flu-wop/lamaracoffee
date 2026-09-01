"use client";

import { useState, useEffect, useCallback } from "react";

type CheckResult = { status: "ok" | "warn" | "error"; detail: string };
type HealthData = {
  envVars: Record<string, CheckResult>;
  checkoutBackend: CheckResult;
  email: CheckResult;
  database: CheckResult;
  menuDataSource: CheckResult;
  checkedAt: string;
};

const STATUS_DOT: Record<CheckResult["status"], string> = {
  ok: "bg-sage-deep",
  warn: "bg-terracotta",
  error: "bg-terracotta-deep",
};

function Pill({ status }: { status: CheckResult["status"] }) {
  return <span className={`mr-2 inline-block h-2.5 w-2.5 rounded-full ${STATUS_DOT[status]}`} />;
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-paper p-5">
      <h3 className="font-display mb-3 text-xl text-ink">{title}</h3>
      {children}
    </div>
  );
}

export default function SystemDashboard() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [data, setData] = useState<HealthData | null>(null);
  const [error, setError] = useState("");

  const fetchHealth = useCallback(async (pw: string) => {
    const res = await fetch("/api/admin/health", { headers: { "x-admin-password": pw } });
    if (res.status === 503) {
      const body = await res.json();
      setError(body.error);
      return;
    }
    if (!res.ok) {
      setError("Wrong password or check failed");
      return;
    }
    setData(await res.json());
    setAuthed(true);
    setError("");
  }, []);

  useEffect(() => {
    if (!authed) return;
    const interval = setInterval(() => fetchHealth(password), 60_000);
    return () => clearInterval(interval);
  }, [authed, password, fetchHealth]);

  if (!authed) {
    return (
      <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6">
        <h1 className="font-display mb-1 text-2xl text-ink">System Health</h1>
        <p className="mb-5 text-sm text-ink-soft">Admin only.</p>
        <input
          type="password"
          placeholder="Admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchHealth(password)}
          className="rounded-xl border border-line bg-cream px-3 py-2 text-sm text-ink focus:border-sage-deep focus:outline-none"
        />
        <button
          onClick={() => fetchHealth(password)}
          className="mt-3 rounded-full bg-ink px-4 py-2 text-xs uppercase tracking-[0.14em] text-cream hover:bg-terracotta-deep"
        >
          Check
        </button>
        {error && <p className="mt-3 text-sm text-terracotta-deep">{error}</p>}
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="font-display text-3xl text-ink">System Health</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Last checked {new Date(data.checkedAt).toLocaleTimeString()} — refreshes every 60s
      </p>
      <div className="mt-3 rounded-xl border border-line bg-cream-deep px-4 py-3 text-sm text-ink-soft">
        Live checkout — Square, Turso, and Resend should all show green once env vars are set
        in Vercel. A red panel here almost always means a missing or wrong env var.
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Card title="Env Vars">
          {Object.entries(data.envVars).map(([key, r]) => (
            <div key={key} className="mb-1.5 text-sm text-ink">
              <Pill status={r.status} />
              <span className="font-medium">{key}</span> — {r.detail}
            </div>
          ))}
        </Card>

        <Card title="Checkout Backend (Square)">
          <div className="text-sm text-ink">
            <Pill status={data.checkoutBackend.status} />
            {data.checkoutBackend.detail}
          </div>
        </Card>

        <Card title="Order Email (Resend)">
          <div className="text-sm text-ink">
            <Pill status={data.email.status} />
            {data.email.detail}
          </div>
        </Card>

        <Card title="Order Database (Turso)">
          <div className="text-sm text-ink">
            <Pill status={data.database.status} />
            {data.database.detail}
          </div>
        </Card>

        <Card title="Menu Data Source">
          <div className="text-sm text-ink">
            <Pill status={data.menuDataSource.status} />
            {data.menuDataSource.detail}
          </div>
        </Card>
      </div>
    </div>
  );
}
