// Fil: src/components/LogoutButton/index.tsx
"use client";

import { useRouter } from "next/navigation";
import { UseUserContext } from "@/utils/context";
import { UserContextType } from "@/utils/types";

export default function LogoutButton() {
  const { setUser } = UseUserContext() as UserContextType;
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("user"); 
    setUser(null); 
    router.push("/"); 
  };

  return (
    <button
      onClick={logout}
      className="bg-white text-black px-3 py-1 rounded border cursor-pointer"
    >
      Logout
    </button>
  );
}
