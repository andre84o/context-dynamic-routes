'use client'
import Image from "next/image";
import { UserContextType } from "@/utils/types";
import { UseUserContext } from "@/utils/context";

const Header = () => {
    const { user } = UseUserContext() as UserContextType;
  return (
    <header className="relative w-full h-20 bg-black text-white grid grid-cols-[auto_1fr_auto] items-center px-4">
      {/* Vänster: logga */}
      <div className="justify-self-start">
        <Image
          src="/foodie-logo.png"
          alt="Foodie Logo"
          width={56}
          height={56}
          priority
        />
      </div>

      {/* Mitten: titel alltid i mitten */}
      <h1 className="justify-self-center text-xl font-semibold">Recipes</h1>

      {/* Höger: user-text om inloggad */}
      <div className="justify-self-end">
        {user && <p className="text-sm">{`Welcome, ${user.name}`}</p>}
      </div>
    </header>
  );
};

export default Header;
