import { create } from "zustand";

interface LeadModalStore {
  open: boolean;
  /** Which part of the page the popup was opened from ("hero", "faq", …). */
  source: string;
  openModal: (source?: string) => void;
  closeModal: () => void;
}

/** Whether the lead popup is up. Any CTA on the page opens it. */
export const useLeadModal = create<LeadModalStore>((set) => ({
  open: false,
  source: "",
  openModal: (source) => set({ open: true, source: source ?? "" }),
  closeModal: () => set({ open: false }),
}));

/**
 * Names the place a CTA sits in — its section's id, else the section's
 * heading id without the suffix ("hero-title" → "hero"), else `header` /
 * `footer` — so each lead records which call to action produced it.
 */
export const ctaSource = (el: Element): string => {
  const host = el.closest("section, header, footer");
  if (!host) return "seite";
  const labelled = host.getAttribute("aria-labelledby")?.replace(/-(title|heading)$/, "");
  return host.id || labelled || host.tagName.toLowerCase();
};
