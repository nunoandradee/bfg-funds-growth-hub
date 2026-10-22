// Proof a careful visitor looks for before sharing an SSN: real people, real
// reviews, a promise about their data. Every block that uses these renders
// only once real entries exist here. Never add placeholders, sample names or
// ratings: an empty list simply hides the section.

export type TeamMember = {
  name: string;
  role: string;
  /** Imported image URL (e.g. `import photo from "@/assets/team/name.jpg"`). */
  photo?: string;
  /** One or two plain sentences. */
  bio: string;
  /** e.g. "Funding specialist since 2019". */
  experience?: string;
};

/** The people a client may speak with. */
export const TEAM: TeamMember[] = [];

export type ReviewSource = {
  source: "Google" | "Trustpilot" | "BBB";
  /** Average rating as shown on the source (out of 5). */
  rating: number;
  count: number;
  /** Public profile URL, so visitors can check it themselves. */
  url: string;
};

/** Public review profiles with their current rating and count. */
export const REVIEWS: ReviewSource[] = [];

/**
 * Shown on the application and the short form once the team confirms it is
 * true in practice. Keep false until then.
 */
export const DATA_PROMISE_CONFIRMED = false;
export const DATA_PROMISE =
  "We never sell your information. Your file goes only to the funding providers you approve.";
