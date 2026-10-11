import { notFound } from "next/navigation";

// Call at every preview page entry point BEFORE rendering its content. A layout
// guard alone can leave child content in the React Server Component payload.
export function assertPreviewAccess() {
  if (process.env.NODE_ENV !== "development") notFound();
}
