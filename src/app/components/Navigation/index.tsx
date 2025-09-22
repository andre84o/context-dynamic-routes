"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UseUserContext } from "@/utils/context";
import { UserContextType } from "@/utils/types";
import UserMenuButton from "@/components/UserMenuButton";
import LoginButton from "@/components/LoginButton";

const items = [
  { href: "/", label: "Home" },
  { href: "/page/Category", label: "Category" },
  { href: "/page/about", label: "About" },
];

export default function DesktopNavigation() {
  const pathname = usePathname();
  const { user } = UseUserContext() as UserContextType;

  return (
    <nav className="w-full flex justify-end relative hidden md:block">
      <ul className="hidden md:flex w-full gap-2 list-none text-sm m-0 p-0 items-center">
        {items.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <li key={href} className="rounded">
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`btn-action inline-flex px-4 h-9 items-center justify-center rounded text-sm truncate border font-medium ${
                  isActive ? "btn-primary text-white" : "glass text-slate-700"
                }`}
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
