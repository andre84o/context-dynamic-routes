"use client";
import Link from "next/link";
import { UseUserContext } from "@/utils/context";


export default function Hero() {
  const { openLogin } = UseUserContext();
  return (
    <section className="w-full max-w-5xl mx-auto grid md:grid-cols-2 gap-6 items-center p-6">
      <div className="mt-auto grid grid-cols-2 gap-2 w-full">
        <h2 className="text-3xl font-bold">Today’s Special</h2>
        <p className="mt-2 text-sm">Handpicked meal for today.</p>
        <Link
          href="/page/category"
          className="px-3 py-1 border rounded w-full text-center btn-action cursor-pointer"
        >
          View Menu
        </Link>
        <button
          onClick={openLogin}
          className="px-3 py-1 border rounded w-full btn-action cursor-pointer"
        >
          Log in
        </button>
      </div>
    </section>
  );
}
