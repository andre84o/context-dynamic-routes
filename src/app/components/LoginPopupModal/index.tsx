// Fil: src/components/LoginModal.tsx
"use client";

import LoginForm from "@/components/LoginForm";

export default function LoginPopupModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  // Svensk kommentar: Visa inget om modalen inte är öppen
  if (!open) return null;

  return (
    // Svensk kommentar: Overlay som stänger modalen vid klick utanför panelen
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />
      {/* Svensk kommentar: Modalpanel med din LoginForm */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-md shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Log in</h2>
            <button
              onClick={onClose}
              aria-label="Close"
              className="px-2 py-1 border rounded"
            >
              Close
            </button>
          </div>
          {/* Svensk kommentar: Din form direkt */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
