import { z } from "zod";

import { getServerEnv } from "@/env";
import { ApiError, handle } from "@/lib/api";

/**
 * The hero lead form's endpoint. Validates the submission and forwards it to
 * `CONTACT_ENDPOINT` (CRM / webhook) when one is configured; otherwise logs
 * server-side so the site runs as-is in development.
 */
const leadSchema = z.object({
  brand: z.string().trim().min(1).max(60),
  /** Empty when the brand is "other" — the free-text field carries it then. */
  model: z.string().trim().max(80).optional().or(z.literal("")),
  vehicleOther: z.string().trim().max(120).optional().or(z.literal("")),
  year: z.string().trim().max(4).optional().or(z.literal("")),
  mileage: z.string().trim().max(12).optional().or(z.literal("")),
  name: z.string().trim().min(1).max(100),
  email: z.email(),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  /** Honeypot: a field no person sees. Bots fill it; we then say thanks and drop the lead. */
  website: z.string().max(200).optional().or(z.literal("")),
});

export const POST = handle(async (req) => {
  const { website, ...raw } = leadSchema.parse(await req.json());
  if (website) return { received: true };
  // One readable line for the CRM, alongside the structured fields.
  const input = {
    ...raw,
    vehicle: [raw.brand, raw.model, raw.vehicleOther].filter(Boolean).join(" · "),
  };

  const { CONTACT_ENDPOINT } = getServerEnv();

  if (CONTACT_ENDPOINT) {
    const upstream = await fetch(CONTACT_ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ source: "voltio-landingpage", ...input }),
    });
    if (!upstream.ok) {
      throw new ApiError(502, "upstream_error", "Failed to deliver the lead.");
    }
  } else {
    console.log("[api/contact] lead:", input);
  }

  return { received: true };
});
