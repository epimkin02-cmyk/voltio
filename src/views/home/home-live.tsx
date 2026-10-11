"use client";

import { tinaField, useEditState, useTina } from "tinacms/dist/react";

import { parseHomePage } from "@/lib/content/home-page";
import type { TinaPagePayload } from "@/lib/content/load-home-page";

import { HomeLayout, type EditFields } from "./home-layout";

/** A document node as Tina hands it to the page, metadata included. */
type TinaNode = Record<string, unknown>;

const asNode = (value: unknown): TinaNode =>
  typeof value === "object" && value !== null && !Array.isArray(value) ? (value as TinaNode) : {};

/**
 * The editor preview of the home page (route `/bearbeiten`). Tina's admin
 * loads it in an iframe; `useTina` swaps the server data for the live form
 * data as the editor types, and in edit mode every part of the page becomes
 * a click target that opens its form. The public `/` never loads this.
 */
export const HomeLive = (props: TinaPagePayload) => {
  const { data } = useTina(props);
  const { edit } = useEditState();
  const page = parseHomePage(data.page);
  const raw = asNode(data.page);

  const fields: EditFields | undefined = edit
    ? {
        header: tinaField(raw, "header"),
        hero: tinaField(raw, "hero"),
        footer: tinaField(raw, "footer"),
        blocks: page.blocks.map(({ raw: block }) => tinaField(asNode(block))),
      }
    : undefined;

  return <HomeLayout page={page} edit={fields} />;
};
