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
            <li key={href} className="md:flex-1 min-w-0 rounded">
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                className="btn-action block w-full px-2 h-8 rounded border flex items-center justify-center text-sm truncate
                bg-black text-white
                aria-[current=page]:bg-white aria-[current=page]:text-black aria-[current=page]:border-white
                shadow-[0_0_1em_0.25em_#ff6b60,0_0_4em_1em_rgba(230,62,51,0.3),inset_0_0_0.75em_0.25em_#ff6b60]
                transition-all duration-300
                hover:bg-transparent hover:text-inherit
                hover:shadow-[0_0_0.2em_0.1em_rgba(230,62,51,0.15),0_0_0.5em_0.2em_rgba(230,62,51,0.1),inset_0_0_0.3em_0.1em_rgba(230,62,51,0.15)]
                aria-[current=page]:hover:bg-white aria-[current=page]:hover:text-black
                aria-[current=page]:hover:shadow-[0_0_1em_0.25em_#ff6b60,0_0_4em_1em_rgba(230,62,51,0.3),inset_0_0_0.75em_0.25em_#ff6b60]
                active:shadow-[0_0_0.4em_0.1em_rgba(230,62,51,0.2),0_0_1em_0.3em_rgba(230,62,51,0.2),inset_0_0_0.3em_0.1em_rgba(230,62,51,0.2)]"
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
