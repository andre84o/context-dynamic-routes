// Fil: src/app/page/profile/page.tsx
"use client";
import { UseUserContext } from "@/utils/context";
import { UserContextType } from "@/utils/types";

export default function ProfilePage() {
  const { user } = UseUserContext() as UserContextType;

  return (
    <main className="min-h-screen w-full flex items-center justify-center">
      <div className="flex w-100 h-120 flex-col items-center gap-2 border-1 rounded-xl">
        <h1 className="flex justify-center items-center font-bold p-2 mt-3">
          Profile Page
        </h1>

        {user ? (
          <div className="space-y-2">
            <p className="w-full p-2 border rounded-lg">Name: {user.name}</p>
            <p className="w-full p-2 border rounded-lg">
              Favourite Category: {user.favouriteCategory}
            </p>

            {/* Svensk kommentar: Visa sparade favoriter som lista */}
            <ul className="w-full p-2 border rounded-lg list-disc list-inside">
              {user.favouriteRecipes?.length ? (
                user.favouriteRecipes.map((id) => <li key={id}>{id}</li>)
              ) : (
                <li>None</li>
              )}
            </ul>
          </div>
        ) : (
          <p>Please log in to view your profile.</p>
        )}
      </div>
    </main>
  );
}
