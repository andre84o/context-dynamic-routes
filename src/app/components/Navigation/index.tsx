"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Hamburger from "hamburger-react";
import { UseUserContext } from "@/utils/context";
import { UserContextType } from "@/utils/types";
import LogoutButton from "@/components/LogoutButton";
import LoginButton from "@/components/LoginButton";
import UserMenuButton from "@/components/UserMenuButton";

const items = [
  { href: "/", label: "Home" },
  { href: "/page/Category", label: "Category" },
 
];

export default function Navigation() {
  const pathname = usePathname();
  const { user } = UseUserContext() as UserContextType;
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full flex justify-end relative">
      <div className="block md:hidden">
        <div className="px-2 py-2">
          <Hamburger toggled={open} toggle={setOpen} size={20} />
        </div>
        {open && (
          <div
            role="menu"
            className="absolute right-0 mt-2 w-44 bg-white border rounded shadow p-1 z-50"
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
            <div className="border-t my-1" />
            <div className="px-3 py-2">
              {user ? <LogoutButton /> : <LoginButton />}
            </div>
          </div>
        )}
      </div>
      <ul className="hidden md:flex w-full gap-2 list-none text-sm m-0 p-0 items-center">
        {items.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <li key={href} className="md:flex-1 min-w-0">
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                className="btn-action block w-full px-2 h-8 rounded border flex items-center justify-center text-sm truncate
               bg-black text-white border-white
               aria-[current=page]:bg-white aria-[current=page]:text-black aria-[current=page]:border-white"
              >
                {label}
              </Link>
            </li>
          );
        })}
        <li className="flex items-center justify-center">
          {user ? <UserMenuButton /> : <LoginButton />}
        </li>
      </ul>
    </nav>
  );
}
