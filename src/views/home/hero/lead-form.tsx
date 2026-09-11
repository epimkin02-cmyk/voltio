"use client";

import { useId, useState, type FormEvent } from "react";

import { apiFetch } from "@/lib/api-client";

import type { LeadFormContent } from "../home.types";

type Status = "idle" | "sending" | "sent" | "error";

const FIELD =
  "h-12 w-full rounded-control border border-line bg-surface px-4 text-body text-content placeholder:text-content-faint transition duration-[var(--duration-fast)] ease-entrance hover:border-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25";

/**
 * The hero's lead form (wireframe 1:64). A real form rather than the frame's
 * picture of one: it posts to `/api/contact`, which validates and forwards to
 * `CONTACT_ENDPOINT` when that is configured.
 */
export const LeadForm = ({ content }: { content: LeadFormContent }) => {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");

  const field = (name: keyof LeadFormContent["fields"]) => `${id}-${name}`;

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
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4"
      aria-labelledby={`${id}-heading`}
    >
      <h2
        id={`${id}-heading`}
        className="text-title font-semibold leading-snug text-content"
      >
        {content.heading}
      </h2>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="sm:col-span-2">
          <span className="sr-only">{content.fields.vehicle}</span>
          <input
            id={field("vehicle")}
            name="vehicle"
            required
            autoComplete="off"
            placeholder={content.fields.vehicle}
            className={FIELD}
          />
        </label>
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
