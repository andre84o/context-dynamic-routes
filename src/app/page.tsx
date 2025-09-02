import Image from "next/image";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";

export default function Home() {
  const user = false;
  return (
    <div className="font-sans flex items-center justify-center text-black min-h-[calc(100vh-48px)] bg-white">
      <div className="w-full max-w-md">
        {user ? <p>Welcome back, User!</p> : <LoginForm />}
      </div>
    </div>
  );
}
