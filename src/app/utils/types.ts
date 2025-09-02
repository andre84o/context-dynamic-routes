import { Dispatch, SetStateAction } from "react";

export interface UserType {
  name: string;
  favouriteCategory: string;
  favouriteRecipes?: string[];
}

export interface UserContextType {
  user: UserType | null;
  setUser: (user: UserType) => void;
}
