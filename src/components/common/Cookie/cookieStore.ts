// 📖 Docs: obsidian/frontend/components/common.md
"use client";

import { create } from "zustand";

const STORAGE_KEY = "cookie-consent-v1";

export type CookieConsent = {
  /** Strictly necessary — always true, never user-disabled. */
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const DEFAULT_CONSENT: CookieConsent = {
  necessary: true,
  analytics: false,
  marketing: false,
};

/**
 * Fired on `window` whenever the visitor decides or changes their mind
 * (`detail` = the new consent). Code outside React — the Meta Pixel — listens
 * here to load on consent and to stop on withdrawal.
 */
export const CONSENT_EVENT = "voltio:consent";

/** The stored decision, or `null` while the visitor has not decided. */
export const readConsent = (): CookieConsent | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CookieConsent>;
    return { ...DEFAULT_CONSENT, ...parsed, necessary: true };
  } catch {
    return null;
  }
};

const saveConsent = (consent: CookieConsent) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    /* ignore storage failures (private mode, quota) */
  }
  try {
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: consent }));
  } catch {
    /* no CustomEvent support — consent still applies on the next load */
  }
};

interface CookieStore {
  /** null until the user has decided. After hydration, the banner shows iff this is null. */
  consent: CookieConsent | null;
  /** True once the client has read localStorage — guards against SSR/CSR mismatch. */
  hydrated: boolean;
  modalOpen: boolean;
  hydrate: () => void;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (next: { analytics: boolean; marketing: boolean }) => void;
  openModal: () => void;
  closeModal: () => void;
}

export const useCookieStore = create<CookieStore>((set) => ({
  consent: null,
  hydrated: false,
  modalOpen: false,
  hydrate: () => set({ consent: readConsent(), hydrated: true }),
  acceptAll: () => {
    const next: CookieConsent = { necessary: true, analytics: true, marketing: true };
    saveConsent(next);
    set({ consent: next, modalOpen: false });
  },
  rejectAll: () => {
    const next = { ...DEFAULT_CONSENT };
    saveConsent(next);
    set({ consent: next, modalOpen: false });
  },
  savePreferences: ({ analytics, marketing }) => {
    const next: CookieConsent = { necessary: true, analytics, marketing };
    saveConsent(next);
    set({ consent: next, modalOpen: false });
  },
  openModal: () => set({ modalOpen: true }),
  closeModal: () => set({ modalOpen: false }),
}));
