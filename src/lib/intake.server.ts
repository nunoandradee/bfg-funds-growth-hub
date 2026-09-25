// Forwards form submissions from this site's own server to the processing
// back office. The browser only ever talks to this site; the destination and
// its key live exclusively in server environment variables.

const TIMEOUT_MS = 40_000;

function destination(kind: "lead" | "application"): { url: string; key: string } | null {
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
