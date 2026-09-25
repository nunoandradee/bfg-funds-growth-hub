import { createFileRoute } from "@tanstack/react-router";

const MAX_TOTAL_BYTES = 70 * 1024 * 1024;

// Full business funding application (multipart, may include bank statements).
export const Route = createFileRoute("/api/apply")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const size = Number(request.headers.get("content-length") ?? 0);
        if (size > MAX_TOTAL_BYTES) return Response.json({ ok: false, error: "Files are too large." }, { status: 413 });
        let form: FormData;
        try {
          form = await request.formData();
        } catch {
          return Response.json({ ok: false }, { status: 400 });
        }
        const trap = form.get("website");
        if (typeof trap === "string" && trap.trim()) return Response.json({ ok: true });
        form.delete("website");
        const { forward } = await import("@/lib/intake.server");
        const result = await forward("application", request, form);
        return Response.json(
          { ok: result.ok, ...(result.error ? { error: result.error } : {}) },
          { status: result.ok ? 200 : 502 },
        );
      },
    },
  },
});
