"use client";
import Link from "next/link";
import Image from "next/image";
import { UseUserContext } from "@/utils/context";
import { UserContextType } from "@/utils/types";
import Navigation from "@/components/Navigation";
import MobileNavigation from "../MobileNavigation";

const Header = () => {
  const { user } = UseUserContext() as UserContextType;

  return (
    <header className="sticky top-0 z-50 w-full h-20 glass grid grid-cols-3 items-center px-4">
      <div className="justify-self-start flex items-center gap-3">
        <Link href="/">
          <Image
            src="/foodie-logo.png"
            alt="Foodie Logo"
            width={56}
            height={56}
            priority
          />
        </Link>
        {user && <p className="text-sm text-slate-700">Welcome, {user.name}</p>}
      </div>
      <h1 className="justify-self-center text-xl font-semibold text-gradient">Recipes</h1>
      <div className="justify-self-end flex items-center gap-2">
        <Navigation /> 
        <MobileNavigation />
      </div>
    </header>
  );
};

export default Header;
