import { Suspense } from "react";
import NotFoundClient from "./NotFoundClient";

export default function NotFoundPage() {
  return (
    <Suspense fallback={<div>Laddar 404...</div>}>
      <NotFoundClient />
    </Suspense>
  );
}
