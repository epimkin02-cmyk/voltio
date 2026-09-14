"use client";

import { useId, useState, type FormEvent } from "react";

import { ChevronIcon } from "@/components/ui/icons";
import { OTHER_BRAND, OTHER_MODEL, VEHICLE_BRANDS } from "@/data/vehicles";
import { apiFetch } from "@/lib/api-client";

import type { LeadFormContent } from "@/views/home/home.types";

type Status = "idle" | "sending" | "sent" | "error";

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
 * opening a free-text field. It posts to `/api/contact`, which validates
 * and forwards to `CONTACT_ENDPOINT` when that is configured.
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

  const field = (name: string) => `${id}-${name}`;
  const models = VEHICLE_BRANDS.find((b) => b.name === brand)?.models ?? [];
  const otherBrand = brand === OTHER_BRAND;
  const needsFreeText = otherBrand || model === OTHER_MODEL;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      await apiFetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
      });
      setStatus("sent");
      form.reset();
      setBrand("");
      setModel("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
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
          bots fill it, and the endpoint drops those submissions quietly. */}
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
        {status === "sent" && <span className="text-primary-deep">{content.success}</span>}
        {status === "error" && <span className="text-danger">{content.error}</span>}
        {(status === "idle" || status === "sending") && (
          <span className="text-content-faint">{content.privacy}</span>
        )}
      </p>
    </form>
  );
};
