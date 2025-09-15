// Fil: src/utils/types.ts
import { Dispatch, SetStateAction } from "react";

export interface UserType {
  name: string;
  favouriteCategory: string;
  favouriteRecipes?: string[];
}

export interface UserContextType {
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
  getMealsByCategory: (category: string) => Promise<Meal[]>;
  getMealById: (id: string) => Promise<Meal | null>;
  showLogin: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  getCategories: () => Promise<Category[]>;
  guestFavorites: string[];
  addGuestFavorite: (id: string) => void;
  removeGuestFavorite: (id: string) => void;
}

export type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

export type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  favouriteCategory?: string;
  favouriteRecipes: string[];
};
