"use client";
import LoginForm from "@/components/LoginForm";

export default function LoginPopupModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />
      <div className="absolute inset-0 flex items-start md:items-center justify-center p-4 pt-24 md:pt-4 overflow-y-auto">
        <div
          className="bg-white rounded-2xl w-full max-w-md shadow-lg p-6 max-h-[85vh] overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="login-modal-title"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 id="login-modal-title" className="text-lg font-semibold">Log in</h2>
            <button
              onClick={onClose}
              aria-label="Close"
              className="px-2 py-1 border rounded btn-action cursor-pointer"
            >
              Close
            </button>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
