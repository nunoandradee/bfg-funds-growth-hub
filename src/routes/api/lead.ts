import { createFileRoute } from "@tanstack/react-router";

// Quick funding-options form on the home page.
export const Route = createFileRoute("/api/lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: Record<string, unknown>;
        try {
          body = (await request.json()) as Record<string, unknown>;
        } catch {
          return Response.json({ ok: false }, { status: 400 });
        }
        // Honeypot: real visitors never fill the hidden "website" field.
        if (typeof body["website"] === "string" && body["website"].trim()) return Response.json({ ok: true });
        const { forward } = await import("@/lib/intake.server");
        const payload = JSON.stringify({ ...body, userAgent: request.headers.get("user-agent") ?? "" });
        const result = await forward("lead", request, payload, "application/json");
        return Response.json({ ok: result.ok }, { status: result.ok ? 200 : 502 });
      },
    },
  },
});
