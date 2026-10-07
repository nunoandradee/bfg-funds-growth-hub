import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { COMPANY } from "@/data/site";

type Search = { t?: string };
type State =
  | { kind: "loading" }
  | { kind: "ready"; masked: string; unsubscribed: boolean }
  | { kind: "invalid" }
  | { kind: "error" };

export const Route = createFileRoute("/unsubscribe")({
  validateSearch: (search: Record<string, unknown>): Search =>
    typeof search["t"] === "string" ? { t: search["t"] } : {},
  head: () => ({
    meta: [
      { title: "Email preferences | BFG Funds" },
      { name: "description", content: "Unsubscribe from BFG Funds emails." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: UnsubscribePage,
});

async function call(t: string, action: "check" | "unsubscribe" | "resubscribe") {
  const res = await fetch("/api/unsubscribe", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ t, action }),
  });
  return (await res.json().catch(() => ({ ok: false }))) as {
    ok: boolean;
    masked?: string;
    unsubscribed?: boolean;
    invalid?: boolean;
  };
}

function UnsubscribePage() {
  const { t } = Route.useSearch();
  const [state, setState] = useState<State>({ kind: "loading" });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!t) {
      setState({ kind: "invalid" });
      return;
    }
    let active = true;
    call(t, "check").then((r) => {
      if (!active) return;
      if (r.ok) setState({ kind: "ready", masked: r.masked ?? "", unsubscribed: Boolean(r.unsubscribed) });
      else setState({ kind: r.invalid ? "invalid" : "error" });
    });
    return () => {
      active = false;
    };
  }, [t]);

  const change = async (action: "unsubscribe" | "resubscribe") => {
    if (!t) return;
    setBusy(true);
    const r = await call(t, action);
    setBusy(false);
    if (r.ok) setState({ kind: "ready", masked: r.masked ?? "", unsubscribed: Boolean(r.unsubscribed) });
    else setState({ kind: r.invalid ? "invalid" : "error" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container-page max-w-xl py-20 md:py-28">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cobalt">Email preferences</p>

        {state.kind === "loading" && <p className="mt-6 text-muted-foreground">Checking your link…</p>}

        {state.kind === "invalid" && (
          <>
            <h1 className="mt-4 text-3xl font-extrabold text-navy md:text-4xl">This link is not valid</h1>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Please use the Unsubscribe link from a recent {COMPANY.displayName} email, or write to{" "}
              <a className="font-semibold text-cobalt underline" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> and we
              will remove you.
            </p>
          </>
        )}

        {state.kind === "error" && (
          <>
            <h1 className="mt-4 text-3xl font-extrabold text-navy md:text-4xl">Something went wrong</h1>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Please try again in a moment, or write to{" "}
              <a className="font-semibold text-cobalt underline" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> and we
              will remove you.
            </p>
          </>
        )}

        {state.kind === "ready" && !state.unsubscribed && (
          <>
            <h1 className="mt-4 text-3xl font-extrabold text-navy md:text-4xl">Unsubscribe from {COMPANY.displayName} emails</h1>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {state.masked ? <>We will stop emailing <strong className="text-navy">{state.masked}</strong>. </> : null}
              You can still reach us any time at {COMPANY.phoneDisplay}.
            </p>
            <button
              type="button"
              disabled={busy}
              onClick={() => change("unsubscribe")}
              className="mt-8 inline-flex h-12 items-center rounded-full bg-navy px-8 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-60"
            >
              {busy ? "Unsubscribing…" : "Unsubscribe"}
            </button>
          </>
        )}

        {state.kind === "ready" && state.unsubscribed && (
          <>
            <h1 className="mt-4 text-3xl font-extrabold text-navy md:text-4xl">You&rsquo;re unsubscribed</h1>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {state.masked ? <><strong className="text-navy">{state.masked}</strong> will </> : "You will "}
              no longer receive emails from {COMPANY.displayName}.
            </p>
            <button
              type="button"
              disabled={busy}
              onClick={() => change("resubscribe")}
              className="mt-8 text-sm font-semibold text-cobalt underline disabled:opacity-60"
            >
              {busy ? "Saving…" : "Unsubscribed by mistake? Resubscribe"}
            </button>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
