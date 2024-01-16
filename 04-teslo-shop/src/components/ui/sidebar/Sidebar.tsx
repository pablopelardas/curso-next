"use client";
import { logout } from "@/actions";
import { useUIStore } from "@/store";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeSideMenu = useUIStore((state) => state.closeSideMenu);

  const { data: session } = useSession();
  console.log(session);

  return (
    <div>
      {isSideMenuOpen && (
        <>
          {/* Background black */}
          <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"></div>
          {/* Blur */}
          <div className="fade-in fixed top-0 left-0 w-screen h-screen backdrop-filter backdrop-blur-sm"></div>
        </>
      )}
      {/* Sidemenu */}
      <nav
        className={clsx(
          "fixed p-5 right-0 top-0 w-[300px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
          {
            "translate-x-full": !isSideMenuOpen,
          }
        )}
      >
        <IoCloseOutline
          size={50}
          className="absolute top-0 right-5 cursor-pointer"
          onClick={() => closeSideMenu()}
        ></IoCloseOutline>
        {/* input */}
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-600"
            placeholder="Search"
          />
        </div>
        {/* Menu */}
        <Link
          href="/profile"
          onClick={() => closeSideMenu()}
          className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoPersonOutline size={30} />
          <span className="ml-3 text-lg">Perfil</span>
        </Link>
        <Link
          href="/"
          className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoTicketOutline size={30} />
          <span className="ml-3 text-lg">Ordenes</span>
        </Link>
        <Link
          href="/auth/login"
          onClick={() => closeSideMenu()}
          className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoLogInOutline size={30} />
          <span className="ml-3 text-lg">Ingresar</span>
        </Link>
        <button
          className="flex w-full items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
          onClick={() => logout()}
        >
          <IoLogOutOutline size={30} />
          <span className="ml-3 text-lg">Salir</span>
        </button>
        {/* Line separator */}
        <div className="w-full h-px bg-gray-200 my-10"></div>
        <Link
          href="/"
          className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoShirtOutline size={30} />
          <span className="ml-3 text-lg">Productos</span>
        </Link>
        <Link
          href="/"
          className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoTicketOutline size={30} />
          <span className="ml-3 text-lg">Ordenes</span>
        </Link>
        <Link
          href="/"
          className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoPeopleOutline size={30} />
          <span className="ml-3 text-lg">Clientes</span>
        </Link>
      </nav>
    </div>
  );
};
