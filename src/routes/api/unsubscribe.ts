import { createFileRoute } from "@tanstack/react-router";

// Email preferences page. Opening the page only checks the link (mail
// scanners open links on their own); the visitor's click unsubscribes.
export const Route = createFileRoute("/api/unsubscribe")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: { t?: unknown; action?: unknown };
        try {
          body = (await request.json()) as { t?: unknown; action?: unknown };
        } catch {
          return Response.json({ ok: false }, { status: 400 });
        }
        const token = typeof body.t === "string" ? body.t.slice(0, 2000) : "";
        if (!token) return Response.json({ ok: false, invalid: true }, { status: 400 });
        const action =
          body.action === "unsubscribe" || body.action === "resubscribe" ? body.action : "check";
        const { unsubscribeRequest } = await import("@/lib/intake.server");
        const result = await unsubscribeRequest(request, token, action);
        return Response.json(result, { status: result.ok ? 200 : result.invalid ? 400 : 502 });
      },
    },
  },
});
