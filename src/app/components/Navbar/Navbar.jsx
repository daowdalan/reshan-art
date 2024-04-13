"use client"
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { usePathname } from 'next/navigation';

const navLinks = [
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Projects",
    path: "/projects",
  },
  {
    title: "Contact",
    path: "/contact",
  },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarRef = useRef(null); // Ref for navbar element
  const pathname = usePathname();

  // Function to handle clicks outside the navbar
  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setNavbarOpen(false);
    }
  };

  // Effect to add event listener when component mounts
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLinkClick = () => {
    // Hide the dropdown menu when a link is clicked
    setNavbarOpen(false);
  };

  return (
    <nav ref={navbarRef} className="fixed mx-auto border border-[#33353F] top-0 left-0 right-0 z-10 bg-[#121212] bg-opacity-100">
      <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2">
        <Link href={"/"} className="text-2xl md:text-5xl text-white font-semibold" onClick={handleLinkClick}> 
          RESHAN-ART
        </Link>
        <div className="mobile-menu block md:hidden">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link, index) => {
              const isActive = pathname.startsWith(link.path);
              return (
                <li key={index}>
                  <Link href={link.path} onClick={handleLinkClick} className={!isActive?`block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0`:`block py-2 pl-3 pr-4 text-[#9a3a9a] sm:text-xl rounded md:p-0`}>
                    {link.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {navbarOpen ? (
        <ul className="flex flex-col py-4 items-center">
          {navLinks.map((link, index) => {
            const isActive = pathname.startsWith(link.path);
            return (
              <li key={index}>
                <Link href={link.path} onClick={handleLinkClick} className={!isActive?`block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0`:`block py-2 pl-3 pr-4 text-[#9a3a9a] sm:text-xl rounded md:p-0`} >
                  {link.title}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </nav>
  );
};

export default Navbar;
