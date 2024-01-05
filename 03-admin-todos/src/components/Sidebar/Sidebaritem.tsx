"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiBookmarkCheck } from "react-icons/ci";

interface Props {
  title: string;
  href?: string;
  icon?: React.ReactNode;
}

export const Sidebaritem = ({
  title,
  href = "#",
  icon = <CiBookmarkCheck size={30} />,
}: Props) => {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <li>
      <Link
        href={href}
        className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl  text-gray-600 group ${
          active && " text-white bg-gradient-to-r from-sky-600 to-cyan-400"
        }`}
      >
        {icon}
        <span className="-mr-1 font-medium">{title}</span>
      </Link>
    </li>
  );
};
