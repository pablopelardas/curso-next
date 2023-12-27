import { ActiveLink } from "..";
const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Pricing", href: "/pricing" },
];

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
      {navItems.map(({ name, href }) => (
        <ActiveLink key={name} path={href} text={name} />
      ))}
    </nav>
  );
};
