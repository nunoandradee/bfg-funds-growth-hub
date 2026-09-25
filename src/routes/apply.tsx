import { createFileRoute } from "@tanstack/react-router";

import { ApplicationForm } from "@/components/site/ApplicationForm";

const TITLE = "Apply for Business Funding | BFG Funds";
const DESCRIPTION =
  "Apply online for $30K–$2M in small business funding with BFG Funds. One secure application, no impact to your credit to review options.";

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ApplyPage,
});

function ApplyPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="flex justify-center py-14 md:py-20">
        <div className="container-page">
          <ApplicationForm />
        </div>
      </main>
    </div>
  );
}
