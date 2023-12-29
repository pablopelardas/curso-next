"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  path: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

export const SidebarMenuItem = ({ path, icon, title, subtitle }: Props) => {
  const pathName = usePathname();

  return (
    <Link
      href={path}
      className={`w-full px-2 inline-flex space-x-2 items-center border-b border-slate-700 py-3 hover:bg-white/5 transition ease-linear duration-150 ${
        pathName === path ? "bg-white/5" : ""
      }`}
    >
      <div>{icon}</div>
      <div className="flex flex-col">
        <span
          className={`text-lg leading-5 text-white ${
            pathName === path && "font-bold"
          }`}
        >
          {title}
        </span>
        <span
          className={`text-sm text-white/50 md:block ${
            pathName === path && "hidden"
          }`}
        >
          {subtitle}
        </span>
      </div>
    </Link>
  );
};
