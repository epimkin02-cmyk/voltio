"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";

import { ChevronIcon } from "@/components/ui/icons";
import { OTHER_BRAND, OTHER_MODEL, VEHICLE_BRANDS } from "@/data/vehicles";
import { optinDone, optinStep, trackEvent, type OptinStep } from "@/lib/tracking/events";
import { submitLead } from "@/lib/tracking/lead-api";
import { attributeLead } from "@/lib/tracking/leadmetrics";
import { newEventId, trackPixel } from "@/lib/tracking/pixel";

import { useLeadModal } from "./lead-modal-store";
import { LeadThanks } from "./lead-thanks";

import type { LeadFormContent } from "@/views/home/home.types";

type Status = "idle" | "sending" | "sent" | "error";

/** Form step a field belongs to, for `optin_schritt`: vehicle first, then contact. */
const CONTACT_FIELDS = new Set(["name", "email", "phone"]);
const stepOf = (field: string): OptinStep => (CONTACT_FIELDS.has(field) ? 2 : 1);

/** One `optin_fehler { art: "eingabe" }` per rejected send, not one per invalid field. */
let invalidReported = false;

const FIELD =
  "h-12 w-full rounded-control border border-line bg-surface px-4 text-body text-content placeholder:text-content-faint transition duration-[var(--duration-fast)] ease-entrance hover:border-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25 disabled:cursor-not-allowed disabled:opacity-60";

/** A native select in the field's clothes: native for the phone's picker, styled to match. */
const Select = ({
  className = "",
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <span className="relative block">
    <select {...props} className={`${FIELD} appearance-none pr-10 ${props.value === "" ? "text-content-faint" : ""} ${className}`} />
    <ChevronIcon className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-content-faint" />
  </span>
);

/**
 * The lead form (wireframe 1:64), shown inside the lead popup. Brand and
 * model are two dependent selects fed by `data/vehicles` — every electric and
 * plug-in hybrid model on the DACH market — with "Andere" on both levels
 * opening a free-text field. The request goes to the page's own `/api/lead`
 * (`lib/tracking/lead-api`), together with the campaign the visitor came from,
 * and from there to Leadmetrics and both Leadtables; with marketing consent the same submit also reports a Meta `Lead`.
 * Once stored, the form gives way to `LeadThanks` in the same popup.
 */
export interface LeadFormProps {
  content: LeadFormContent;
  /** Id for the heading, so a dialog can label itself with it. */
  titleId?: string;
}

export const LeadForm = ({ content, titleId }: LeadFormProps) => {
  const id = useId();
  const headingId = titleId ?? `${id}-heading`;
  const [status, setStatus] = useState<Status>("idle");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const source = useLeadModal((s) => s.source);
  const closeModal = useLeadModal((s) => s.closeModal);

  const field = (name: string) => `${id}-${name}`;
  const models = VEHICLE_BRANDS.find((b) => b.name === brand)?.models ?? [];
  const otherBrand = brand === OTHER_BRAND;
  const needsFreeText = otherBrand || model === OTHER_MODEL;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    const done = () => {
      setStatus("sent");
      form.reset();
      setBrand("");
      setModel("");
    };
    // Honeypot: only bots fill it. Thank them and store nothing.
    if (value("website")) return done();
    setStatus("sending");
    trackEvent("optin_abgeschickt", {});
    const eventId = newEventId();
    try {
      await submitLead(
        {
          marke: value("brand"),
          // The disabled model select is not part of FormData when the brand is "other".
          modell: otherBrand ? "" : value("model"),
          fahrzeug_freitext: value("vehicleOther"),
          erstzulassung: value("year"),
          kilometerstand: value("mileage"),
          name: value("name"),
          email: value("email"),
          telefon: value("phone"),
          quelle: source,
        },
        eventId,
      );
      trackPixel("Lead", eventId);
      attributeLead({ email: value("email"), phone: value("phone") });
      optinDone();
      done();
    } catch {
      trackEvent("optin_fehler", { art: "senden" });
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <LeadThanks
        title={content.successTitle}
        text={content.success}
        close={content.close}
        headingId={headingId}
        onClose={closeModal}
      />
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      onFocusCapture={(e) => {
        const field = (e.target as { name?: string }).name;
        if (field && field !== "website") optinStep(stepOf(field));
      }}
      onInvalidCapture={() => {
        if (invalidReported) return;
        invalidReported = true;
        trackEvent("optin_fehler", { art: "eingabe" });
        // The browser fires `invalid` per field in one go; re-arm for the next attempt.
        window.setTimeout(() => (invalidReported = false), 0);
      }}
      className="flex flex-col gap-4"
      aria-labelledby={headingId}
    >
      <div className="flex flex-col gap-2 pr-10">
        <h2 id={headingId} className="text-title font-semibold leading-snug text-content">
          {content.heading}
        </h2>
        <p className="text-body leading-normal text-content-muted">{content.intro}</p>
      </div>

      {/* Honeypot — off-screen, skipped by tabbing and screen readers; only
          bots fill it, and the form drops those submissions quietly. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <label>
          <span className="sr-only">{content.fields.brand}</span>
          <Select
            id={field("brand")}
            name="brand"
            required
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
              setModel("");
            }}
          >
            <option value="" disabled>
              {content.fields.brand}
            </option>
            {VEHICLE_BRANDS.map((b) => (
              <option key={b.name} value={b.name}>
                {b.name}
              </option>
            ))}
            <option value={OTHER_BRAND}>{OTHER_BRAND}</option>
          </Select>
        </label>
        <label>
          <span className="sr-only">{content.fields.model}</span>
          <Select
            id={field("model")}
            name="model"
            required={!otherBrand}
            disabled={!brand || otherBrand}
            value={otherBrand ? OTHER_MODEL : model}
            onChange={(e) => setModel(e.target.value)}
          >
            <option value="" disabled>
              {content.fields.model}
            </option>
            {models.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
            <option value={OTHER_MODEL}>{OTHER_MODEL}</option>
          </Select>
        </label>
        {needsFreeText && (
          <label className="sm:col-span-2">
            <span className="sr-only">{content.fields.vehicleOther}</span>
            <input
              id={field("vehicleOther")}
              name="vehicleOther"
              required
              autoComplete="off"
              placeholder={content.fields.vehicleOther}
              className={FIELD}
            />
          </label>
        )}
        <label>
          <span className="sr-only">{content.fields.year}</span>
          <input
            id={field("year")}
            name="year"
            inputMode="numeric"
            pattern="[0-9]{4}"
            placeholder={content.fields.year}
            className={FIELD}
          />
        </label>
        <label>
          <span className="sr-only">{content.fields.mileage}</span>
          <input
            id={field("mileage")}
            name="mileage"
            inputMode="numeric"
            placeholder={content.fields.mileage}
            className={FIELD}
          />
        </label>
        <label className="sm:col-span-2">
          <span className="sr-only">{content.fields.name}</span>
          <input
            id={field("name")}
            name="name"
            required
            autoComplete="name"
            placeholder={content.fields.name}
            className={FIELD}
          />
        </label>
        <label>
          <span className="sr-only">{content.fields.email}</span>
          <input
            id={field("email")}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={content.fields.email}
            className={FIELD}
          />
        </label>
        <label>
          <span className="sr-only">{content.fields.phone}</span>
          <input
            id={field("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder={content.fields.phone}
            className={FIELD}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-1 inline-flex h-14 items-center justify-center rounded-control bg-primary px-8 font-display text-body-lg font-semibold text-content-inverse shadow-card transition duration-[var(--duration-normal)] ease-entrance hover:bg-primary-hover hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {status === "sending" ? content.sending : content.submit}
      </button>

      <p aria-live="polite" className="min-h-5 text-small leading-normal">
        {status === "error" && <span className="text-danger">{content.error}</span>}
        {(status === "idle" || status === "sending") && (
          <span className="text-content-faint">
            {content.privacy}{" "}
            <Link
              href="/datenschutz"
              target="_blank"
              rel="noopener"
              className="underline underline-offset-2 transition duration-[var(--duration-fast)] ease-entrance hover:text-content"
            >
              {content.privacyLink}
            </Link>
            .
          </span>
        )}
      </p>
    </form>
  );
};
