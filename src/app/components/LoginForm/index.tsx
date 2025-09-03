'use client';
import { UserArray } from "../data/users";
import { useState } from "react";
import { UseUserContext } from "@/utils/context";
import { UserContextType } from "@/utils/types";

const LoginForm = () => {
    const [userInput, setUserInput] = useState<string>('')
    const [userNotFound, setUserNotFound] = useState<boolean>(true)
    const {user, setUser }= UseUserContext() as UserContextType;
   

    const handleClick = (e: {preventDefault: () => void}) => {
        e.preventDefault();
        const loggedInUser = UserArray.filter(user => user.name === userInput);
        if(!loggedInUser[0]) setUserNotFound(false)
        else setUserNotFound(true)

        setUser(loggedInUser[0]);
        console.log(user)
    }

    const handleChange = (event: {target: {value: any} }) => {
        setUserInput(event.target.value)

        if(user) console.log("User is" + user?.name)
        

    };

    return (
      <>
        <section className="flex justify-center items-center w-full bg-white p-6 min-h-[calc(100vh-48px)]">
          <form className="flex flex-col w-full max-w-md text-black bg-white p-6 rounded shadow">
            <label htmlFor="username">Username:</label>
            <input
              onChange={handleChange}
              value={userInput}
              id="username"
              placeholder="Username"
              className="border p-2 rounded mb-3 w-full"
            />
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              placeholder="Password"
              className="border p-2 rounded mb-3 w-full"
            />
            <button
              onClick={handleClick}
              className="bg-blue-600 text-white p-2 rounded w-full"
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
}

export default LoginForm