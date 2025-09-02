import Image from "next/image";

const Header = () => {
  return (
    <header className="relative w-full h-20 bg-black text-white grid grid-cols-3 items-center px-4">
      <div className="justify-self-start">
        <Image
          src="/foodie-logo.png"
          alt="Foodie Logo"
          width={56}
          height={56}
        />
      </div>
      <h1 className="justify-self-center text-xl font-semibold">Recipes</h1>
      <div />
    </header>
  );
};

export default Header;
