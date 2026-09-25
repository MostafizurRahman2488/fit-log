
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { useFitLog } from "@/context/FitLogContext";

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { plan, saved } = useFitLog();

  const links = [
    {
      name: "Workouts",
      href: "/",
    },
    {
      name: "My Plan",
      href: "/my-plan",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-[#202328] bg-[#0d0f11]">
      <div className="container mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <div className="flex h-[68px] items-center">

          {/* LEFT - LOGO */}
          <div className="flex flex-1 items-center">

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mr-3 flex h-9 w-9 items-center justify-center rounded-md text-[#a0a3a8] hover:bg-[#181b1f] hover:text-white md:hidden"
              aria-label="Toggle menu"
            >
              <span className="text-xl">
                {isMenuOpen ? "✕" : "☰"}
              </span>
            </button>

            {/* LOGO */}
            <Link
              href="/"
              className="flex items-center gap-2"
            >
              <Image
                src="/logo.png"
                alt="FitLog Logo"
                width={30}
                height={30}
                className="h-7 w-7 object-contain"
              />

              <span className="text-sm font-bold tracking-wide text-white sm:text-base">
                FITLOG
              </span>
            </Link>
          </div>

          {/* CENTER - NAVIGATION */}
          <div className="hidden flex-1 justify-center md:flex">
            <ul className="flex items-center gap-1">

              {links.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`rounded-full px-4 py-2 text-xs font-medium transition ${isActive
                          ? "bg-[#243b08] text-[#b8ff00]"
                          : "text-[#85898f] hover:bg-[#181b1f] hover:text-white"
                        }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}

            </ul>
          </div>

          {/* RIGHT - PLAN + SAVED */}
          <div className="flex flex-1 justify-end">

            <div className="flex items-center gap-3 text-[10px] sm:gap-5 sm:text-xs">

              {/* PLAN */}
              <Link
                href="/my-plan"
                className="flex items-center gap-1.5 transition-opacity hover:opacity-80 sm:gap-2"
              >
                <span className="text-[#a0a3a8]">
                  Plan
                </span>

                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ccff00] px-1.5 text-[9px] font-bold text-black">
                  {plan.length}
                </span>
              </Link>

              {/* SAVED */}
              <Link
                href="/my-plan"
                className="flex items-center gap-1.5 transition-opacity hover:opacity-80 sm:gap-2"
              >
                <span className="text-[#a0a3a8]">
                  Saved
                </span>

                <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#34383d] px-1.5 text-[9px] text-[#85898f]">
                  {saved.length}
                </span>
              </Link>

            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="border-t border-[#202328] py-3 md:hidden">

            <ul className="flex flex-col gap-1">

              {links.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <li key={link.href}>

                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block rounded-lg px-4 py-3 text-sm font-medium transition ${isActive
                          ? "bg-[#243b08] text-[#b8ff00]"
                          : "text-[#85898f] hover:bg-[#181b1f] hover:text-white"
                        }`}
                    >
                      {link.name}
                    </Link>

                  </li>
                );
              })}

            </ul>
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;

