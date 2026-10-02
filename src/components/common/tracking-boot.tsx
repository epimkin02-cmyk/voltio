// 📖 Docs: obsidian/frontend/components/common.md
"use client";

import { useEffect } from "react";

import { startPixel } from "@/lib/tracking/pixel";
import { captureAttribution } from "@/lib/tracking/session";

/**
 * Mount once in the root layout. Remembers the campaign parameters the
 * visitor arrived with and arms the Meta Pixel — which stays dormant until
 * (and unless) the visitor agrees to "Marketing". Renders nothing.
 */
export const TrackingBoot = () => {
  useEffect(() => {
    captureAttribution();
    startPixel();
  }, []);
  return null;
};
