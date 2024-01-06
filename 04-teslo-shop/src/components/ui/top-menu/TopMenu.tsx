"use client";
import { titleFont } from "@/config/fonts";
import { useUIStore } from "@/store";
import Link from "next/link";
import React from "react";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";

export const TopMenu = () => {
  const openSideMenu = useUIStore((state) => state.openSideMenu);
  return (
    <nav className="flex px-5 justify-between items-center w-full">
      {/* Logo */}
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>
            Teslo
          </span>
          <span> | Shop</span>
        </Link>
      </div>
      {/* Center menu */}
      <div className="hidden sm:block">
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/category/men"
        >
          <span>Hombres</span>
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/category/women"
        >
          <span>Mujeres</span>
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/category/kid"
        >
          <span>Niños</span>
        </Link>
      </div>
      {/* Search, Cart, Menu */}
      <div className="flex items-center">
        <Link href="/search" className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>
        <Link href="/cart" className="mx-2">
          <div className="relative">
            <span className="absolute text-xs  rounded-full px-1 font-bold -top-2 bg-blue-700 text-white -right-2">
              3
            </span>
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>
        <button
          onClick={() => openSideMenu()}
          className="m-2 p-2 rounded-md transition-all hover: bg-gray-100"
        >
          Menu
        </button>
      </div>
    </nav>
  );
};
