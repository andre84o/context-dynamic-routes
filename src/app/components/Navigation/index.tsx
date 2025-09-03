'use client';

import Link from "next/link";

const Navigation = () => {
    return (
      <div className="flex flex-row border-2">
        <nav>
          <ul className="flex flex-row gap-4 list-none gap-2 border-white">
            <li className="p-1">
              <Link href="/">Home</Link>
            </li>
            <li className="p-1">
              <Link href="/page/profile">About</Link>
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