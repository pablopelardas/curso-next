import Image from "next/image";
import Link from "next/link";
import {
  IoBasketOutline,
  IoCalendarOutline,
  IoCheckboxOutline,
  IoIceCream,
  IoListOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { Sidebaritem } from "./Sidebaritem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { LogoutButton } from "./LogoutButton";

const menuItem = [
  {
    icon: <IoCalendarOutline size={30} />,
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: <IoCheckboxOutline size={30} />,
    title: "Rest TODOS",
    href: "/dashboard/rest-todos",
  },
  {
    icon: <IoListOutline size={30} />,
    title: "Server Actions",
    href: "/dashboard/server-todos",
  },
  {
    icon: <IoIceCream size={30} />,
    title: "Cookies",
    href: "/dashboard/cookies",
  },
  {
    icon: <IoBasketOutline size={30} />,
    title: "Products",
    href: "/dashboard/products",
  },
  {
    icon: <IoPersonOutline size={30} />,
    title: "Profile",
    href: "/dashboard/profile",
  },
];

export const Sidebar = async () => {
  const session = await getServerSession(authOptions);
  const name = session?.user?.name ?? "User";
  const avatar =
    session?.user?.image ??
    "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp";
  const userRoles = (session?.user?.roles ?? ["client"]).join(", ");

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          {/* TODO: Next/Link hacia dashboard */}
          <Link href="#" title="home">
            {/* Next/Image */}
            <Image
              src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
              className="w-32"
              width={128}
              height={128}
              alt="tailus logo"
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          {/* Next/Image */}
          <Image
            src={avatar}
            alt=""
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            width={128}
            height={128}
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {name}
          </h5>
          <span className="hidden text-gray-400 lg:block capitalize">
            {userRoles}
          </span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {menuItem.map((item) => (
            <Sidebaritem key={item.href} {...item} />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogoutButton />
      </div>
    </aside>
  );
};
