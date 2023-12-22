export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
      <a href="/">Home</a>
      <div className="flex flex-1"></div>
      <a className="mr-4" href="/about">
        About
      </a>
      <a className="mr-4" href="/contact">
        Contact
      </a>
      <a className="mr-4" href="/pricing">
        Pricing
      </a>
    </nav>
  );
};
