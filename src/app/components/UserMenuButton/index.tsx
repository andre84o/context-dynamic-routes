"use client";
import { useEffect, useRef, useState } from "react";
import { CiUser } from "react-icons/ci";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { UseUserContext } from "@/utils/context";

export default function UserMenuButton() {
  const { user, openLogin } = UseUserContext();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`h-10 w-10 flex items-center justify-center rounded border 
                    text-white border-white/40 hover:bg-white/10 
                    ${open ? "btn-action cursor-pointer ring-2 ring-white/60 bg-white/10" : ""}`}
        title="User menu"
      >
        <CiUser size={22} />
        <span className="sr-only">User menu</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-44 bg-white text-black border rounded shadow z-50 p-1"
        >
          {user ? (
            <>
              <div className="px-3 py-2 text-xs text-gray-500">Signed in as <span className="font-medium break-all">{user.name}</span></div>
              <Link
                href="/page/Profile"
                className="block px-3 py-2 rounded hover:bg-gray-100"
                role="menuitem"
                onClick={() => setOpen(false)}
              >
                Profile
              </Link>
              <Link
                href="/page/Category"
                className="block px-3 py-2 rounded hover:bg-gray-100"
                role="menuitem"
                onClick={() => setOpen(false)}
              >
                Category
              </Link>
              <div className="border-t my-1" />
              <div className="px-3 py-2">
                <LogoutButton />
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => { openLogin(); setOpen(false); }}
                className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm"
                role="menuitem"
              >
                Login
              </button>
              <Link
                href="/page/Category"
                className="block px-3 py-2 rounded hover:bg-gray-100"
                role="menuitem"
                onClick={() => setOpen(false)}
              >
                Category
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
