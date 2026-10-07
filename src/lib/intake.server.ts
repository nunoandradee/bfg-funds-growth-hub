// Forwards form submissions from this site's own server to the processing
// back office. The browser only ever talks to this site; the destination and
// its key live exclusively in server environment variables.

const TIMEOUT_MS = 40_000;

function destination(kind: "lead" | "application" | "unsubscribe"): { url: string; key: string } | null {
  const base = (process.env["INTAKE_URL"] ?? "").replace(/\/$/, "");
  const key = process.env["INTAKE_KEY"] ?? "";
  if (!base || !key) return null;
  return { url: `${base}/${kind}`, key };
}

export function clientIp(request: Request): string {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    ""
  );
}

/** Sends the payload onward. Returns only ok/failed — nothing about the destination. */
export async function forward(
  kind: "lead" | "application",
  request: Request,
  body: BodyInit,
  contentType?: string,
): Promise<{ ok: boolean; error?: string | undefined }> {
  const dest = destination(kind);
  if (!dest) {
    console.error("[intake] INTAKE_URL / INTAKE_KEY not configured");
    return { ok: false };
  }
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(dest.url, {
      method: "POST",
      headers: {
        authorization: `Bearer ${dest.key}`,
        "x-client-ip": clientIp(request),
        ...(contentType ? { "content-type": contentType } : {}),
      },
      body,
      signal: ctrl.signal,
    });
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
    if (!res.ok || !data.ok) {
      console.error("[intake] rejected", kind, res.status, data.error);
      // Validation messages are safe to show; anything else stays generic.
      const safe = res.status === 400 && typeof data.error === "string" && !/_/.test(data.error) ? data.error : undefined;
      return { ok: false, error: safe };
    }
    return { ok: true };
  } catch (error) {
    console.error("[intake] forward failed", kind, (error as Error)?.message);
    return { ok: false };
  } finally {
    clearTimeout(timer);
  }
}

export type UnsubscribeState = {
  ok: boolean;
  masked?: string | undefined;
  unsubscribed?: boolean | undefined;
  invalid?: boolean | undefined;
};

/** Email preferences: checks or changes the subscription behind a signed email link. */
export async function unsubscribeRequest(
  request: Request,
  token: string,
  action: "check" | "unsubscribe" | "resubscribe",
): Promise<UnsubscribeState> {
  const dest = destination("unsubscribe");
  if (!dest) {
    console.error("[intake] INTAKE_URL / INTAKE_KEY not configured");
    return { ok: false };
  }
  try {
    const res = await fetch(dest.url, {
      method: "POST",
      headers: {
        authorization: `Bearer ${dest.key}`,
        "content-type": "application/json",
        "x-client-ip": clientIp(request),
        "x-client-user-agent": request.headers.get("user-agent") ?? "",
      },
      body: JSON.stringify({ t: token, action }),
      signal: AbortSignal.timeout(15_000),
    });
    const data = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      error?: string;
      masked?: string;
      unsubscribed?: boolean;
    };
    if (!res.ok || !data.ok) {
      if (data.error === "invalid_token") return { ok: false, invalid: true };
      console.error("[intake] unsubscribe rejected", res.status, data.error);
      return { ok: false };
    }
    return { ok: true, masked: data.masked, unsubscribed: Boolean(data.unsubscribed) };
  } catch (error) {
    console.error("[intake] unsubscribe failed", (error as Error)?.message);
    return { ok: false };
  }
}
