import Link from "next/link";

/** 404 page — Next serves it with a 404 status. */
export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 px-5 text-center">
      <h1 className="text-display font-bold text-primary-deep">404</h1>
      <p className="text-body-lg text-content-muted">Diese Seite gibt es nicht.</p>
      <Link href="/" className="font-display font-semibold text-primary underline underline-offset-4">
        Zur Startseite
      </Link>
    </div>
  );
}
