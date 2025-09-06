"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Hamburger from "hamburger-react"; // Svensk kommentar: kräver `npm i hamburger-react`
import LogoutButton from "@/app/components/LogoutButton";
import { UseUserContext } from "@/utils/context";
import { UserContextType } from "@/utils/types";

// Svensk kommentar: Samma länkar som tidigare
const items = [
  { href: "/", label: "Home" },
  { href: "/page/category", label: "Category" },
  { href: "/page/profile", label: "Profile" },
];

export default function Navigation() {
  const pathname = usePathname();
  const { user } = UseUserContext() as UserContextType;
  const [open, setOpen] = useState(false); // Svensk kommentar: styr mobilmenyn

  return (
    <nav className="w-full flex justify-end relative">
      {/* Svensk kommentar: Mobilmeny med hamburger-react */}
      <div className="md:hidden">
        <div className="px-2 py-2">
          <Hamburger toggled={open} toggle={setOpen} size={20} />
        </div>

        {open && (
          <div
            role="menu"
            className="absolute right-0 mt-2 w-40 bg-white border rounded shadow p-1 z-50"
          >
            {items.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                aria-current={pathname === href ? "page" : undefined}
                className="block px-3 py-2 rounded hover:bg-gray-100 aria-[current=page]:bg-black aria-[current=page]:text-white"
              >
                {label}
              </Link>
            ))}

            {user && (
              <div className="px-3 py-2">
                <LogoutButton />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Svensk kommentar: Desktopmeny oförändrad */}
      <ul className="hidden md:flex w-full gap-2 list-none text-sm m-0 p-0">
        {items.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <li key={href} className="md:flex-1 min-w-0">
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                className="btn-action block w-full h-10 rounded -ml-3 border flex items-center justify-center text-center truncate
                           bg-white text-black border-black
                           aria-[current=page]:bg-black aria-[current=page]:text-white aria-[current=page]:border-white"
              >
                {label}
              </Link>
            </li>
          );
        })}

        {user && (
          <li className="md:flex-1 min-w-0 flex items-center justify-center">
            <LogoutButton />
          </li>
        )}
      </ul>
    </nav>
  );
}
