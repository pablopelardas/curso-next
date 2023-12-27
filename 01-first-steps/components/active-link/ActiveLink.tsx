"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import style from "./ActiveLink.module.css";
interface Props {
  path: string;
  text: string;
}

export const ActiveLink = ({ path, text }: Props) => {
  const pathName = usePathname();
  return (
    <Link
      href={path}
      className={`${style.link} ${pathName === path && style["link-active"]}`}
      style={{
        flex: path === "/" ? 1 : 0,
      }}
    >
      {text}
    </Link>
  );
};
