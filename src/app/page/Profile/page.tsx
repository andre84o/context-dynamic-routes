
import { UserContextType } from "@/utils/types";
import { UseUserContext } from "@/utils/context";

const ProfilePage = () => {
  const { user } = UseUserContext() as UserContextType;

  return (
    <div>
      <h1>Profile Page</h1>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Favourite Category: {user.favouriteCategory}</p>
          <p>Favourite Recipes: {user.favouriteRecipes}</p>
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default ProfilePage;