"use client";

import { useEffect } from "react";

/** Route-segment error boundary. Must be a Client Component. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 px-5 text-center">
      <h1 className="text-heading font-semibold text-content">Da ist etwas schiefgelaufen</h1>
      <button
        type="button"
        onClick={reset}
        className="font-display font-semibold text-primary underline underline-offset-4"
      >
        Noch einmal versuchen
      </button>
    </div>
  );
}
