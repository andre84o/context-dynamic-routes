// Fil: src/app/page/LoginForm.tsx
"use client";
import { useRouter } from "next/navigation";
import { UserArray } from "../data/users";
import { useState } from "react";
import { UseUserContext } from "@/utils/context";
import { UserContextType } from "@/utils/types";



const LoginForm = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [userNotFound, setUserNotFound] = useState<boolean>(true);
  const { user, setUser } = UseUserContext() as UserContextType;
  const router = useRouter();

  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const loggedInUser = UserArray.filter((user) => user.name === userInput);
    if (!loggedInUser[0]) {
      setUserNotFound(false);
    } else {
      setUserNotFound(true);
      setUser(loggedInUser[0]);
      localStorage.setItem("user", JSON.stringify(loggedInUser[0]));
      router.push("/");
    }
  };

  const handleChange = (event: { target: { value: any } }) => {
    setUserInput(event.target.value);
    if (user) console.log("User is" + user?.name);
  };

  return (
    <>
      <section className="flex bg-transparent justify-center items-center w-full p-6 min-h-[calc(50vh-48px)]">
        <form className="flex flex-col gap-4 w-full max-w-md h-120 text-black bg-white/7 backdrop-blur-md border border-white/20 shadow-lg p-6 rounded-xl">
          <h1 className="text-xl font-semibold flex justify-center">Login</h1>

          <div className="flex flex-col gap-1 group mt-7">
            <label htmlFor="username" className="group-focus-within:hidden">
              username:
            </label>
            <input
              onChange={handleChange}
              value={userInput}
              id="username"
              placeholder="Username"
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="flex flex-col gap-1 group mt-5">
            <label htmlFor="password" className="group-focus-within:hidden">
              password:
            </label>
            <input
              id="password"
              placeholder="Password"
              type="password"
              className="border p-2 rounded w-full"
            />
          </div>
          <button
            type="button"
            onClick={handleClick}
            className="bg-blue-600 text-white p-3 rounded-lg w-1/2 mt-15 self-center
                       transition-transform duration-100
                       active:scale-95 active:translate-y-[1px] active:bg-blue-700
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 cursor-pointer"
          >
            Login
          </button>

          {!userNotFound && (
            <p className="mt-5 text-center text-red-500">User not found</p>
          )}
        </form>
      </section>
    </>
  );
};

export default LoginForm;
