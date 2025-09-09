// Fil: src/components/LoginButton/index.tsx
"use client";

import { useEffect, useState, MouseEvent } from "react";
import LoginForm from "@/components/LoginForm";
import { UseUserContext } from "@/utils/context";
import { UserContextType } from "@/utils/types";

export default function LoginButton() {
  const [open, setOpen] = useState(false);
  const { user } = UseUserContext() as UserContextType;
  useEffect(() => {
    if (user) setOpen(false);
  }, [user]);

  const stop = (e: MouseEvent) => e.stopPropagation();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-white text-black px-3 py-1 rounded border cursor-pointer"
      >
        Sign in
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
        >
          <div
            onClick={stop}
            className="bg-white rounded shadow p-4 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Sign in</h2>
              <button
                onClick={() => setOpen(false)}
                className="px-2 py-1 border rounded"
              >
                Close
              </button>
            </div>
            <LoginForm />
          </div>
        </div>
      )}
    </>
  );
}
