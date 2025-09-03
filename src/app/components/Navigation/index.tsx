'use client';

import Link from "next/link";

const Navigation = () => {
    return (
      <div className="flex flex-row">
        <nav>
          <ul className="flex flex-row gap-4 list-none">
            <li className="p-1">
              <Link href="/">Home</Link>
            </li>
            <li className="p-1">
              <Link href="/about">About</Link>
            </li>
            <li className="p-1">
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
}

export default Navigation;