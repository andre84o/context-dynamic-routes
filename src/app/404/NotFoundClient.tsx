"use client";

export default function NotFoundClient() {
  // Keep 404 purely static to avoid suspense requirement for useSearchParams.
  // If later you need query info, reintroduce useSearchParams wrapped by Suspense.
  return <div>404 – Page not found</div>;
}
