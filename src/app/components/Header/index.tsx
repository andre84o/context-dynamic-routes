"use client";
import Link from "next/link";
import Image from "next/image";
import { UserContextType } from "@/utils/types";
import { UseUserContext } from "@/utils/context";
import Navigation from "@/components/Navigation";
import LoginButton from "@/components/LoginButton";


const Header = () => {
  const { user } = UseUserContext() as UserContextType;

  return (
    <header className="relative w-full h-20 bg-black text-white grid grid-cols-3 items-center px-4">
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
        {user && <p className="text-sm">Welcome, {user.name}</p>}
      </div>
      <h1 className="justify-self-center text-xl font-semibold">Recipes</h1>
      <div className="justify-self-end w-80">
        {user ? <Navigation /> : <LoginButton />}
      </div>
    </header>
  );
};

export default Header;
