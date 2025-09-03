"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import * as React from "react";
import { CssBaseline } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const items = [
  { href: "/", label: "Home" },
  { href: "/page/category", label: "Category" },
  { href: "/page/profile", label: "Profile" },
];

export default function Navigation() {
  const pathname = usePathname();

  // Mobilmeny (MUI)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <nav className="w-full">
      {/* Mobil: endast knapp + meny */}
      <div className="md:hidden">
        <CssBaseline />
        <Button
          id="mobile-menu-button"
          aria-controls={open ? "mobile-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          Dashboard
        </Button>

        <Menu
          id="mobile-menu"
          aria-labelledby="mobile-menu-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          {items.map(({ href, label }) => (
            <MenuItem
              key={href}
              component={Link}
              href={href}
              onClick={handleClose}
              selected={pathname === href}
            >
              {label}
            </MenuItem>
          ))}
        </Menu>
      </div>

      
      <ul className="hidden md:flex flex w-full gap-2 list-none text-sm m-0 p-0">
        {items.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <li key={href} className="md:flex-1 min-w-0">
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                className="btn-action block w-full h-10 rounded -ml-3 border flex items-center justify-center text-center truncate
                           bg-white text-black border-black
                           aria-[current=page]:bg-black aria-[current=page]:text-white aria-[current=page]:border-white"
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
