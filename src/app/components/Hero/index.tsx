"use client";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full max-w-5xl mx-auto grid md:grid-cols-2 gap-6 items-center p-6">
      <div>
        <h2 className="text-3xl font-bold">Today’s Special</h2>
        <p className="mt-2 text-sm">Handpicked meal for today.</p>
        <Link
          href="/page/category"
          className="inline-block mt-4 px-4 py-2 border rounded"
        >
          View Menu
        </Link>
      </div>
      <div className="justify-self-center">
        <Image
          src="/hero-special.jpg"
          alt="Today’s special"
          width={420}
          height={280}
          className="rounded"
        />
      </div>
    </section>
  );
}
