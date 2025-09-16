"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Hamburger from "hamburger-react";
import { UseUserContext } from "@/utils/context";
import { UserContextType } from "@/utils/types";
import LogoutButton from "@/components/LogoutButton";
import LoginButton from "@/components/LoginButton";

const items = [
  { href: "/", label: "Home" },
  { href: "/page/Category", label: "Category" },
  { href: "/page/about", label: "About" },
];

export default function MobileNavigation() {
  const pathname = usePathname();
  const { user } = UseUserContext() as UserContextType;
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full flex justify-end relative md:hidden">
      <div className="px-2 py-2">
        <Hamburger toggled={open} toggle={setOpen} size={20} />
      </div>
      {open && (
        <div
          className="fixed inset-0 z-40"
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      )}

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-20 w-44 bg-white border rounded shadow p-1 z-50"
        >
          {items.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              aria-current={pathname === href ? "page" : undefined}
              className="block px-3 py-2 rounded text-black hover:bg-gray-100 aria-[current=page]:bg-black aria-[current=page]:text-white"
            >
              {label}
            </Link>
          ))}
          {user && (
            <Link
              href="/page/Profile"
              onClick={() => setOpen(false)}
              aria-current={pathname === "/page/Profile" ? "page" : undefined}
              className="block px-3 py-2 rounded text-black hover:bg-gray-100 aria-[current=page]:bg-black aria-[current=page]:text-white"
            >
              Profile
            </Link>
          )}

          <div className="border-t my-1" />

          <div className="px-3 py-2">
            {user ? <LogoutButton /> : <LoginButton />}
          </div>
        </div>
      )}
    </nav>
  );
}
