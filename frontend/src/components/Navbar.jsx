function Navbar() {
  return (
    <nav className="nav ">
      <ul className="flex items-center gap-5">
        <li className="relative hover-half-underline cursor-pointer font-semibold">
          <span>Home</span>
        </li>
        <li className="relative hover-half-underline cursor-pointer font-semibold">
          <span>News</span>
        </li>
        <li className="relative hover-half-underline cursor-pointer font-semibold">
          <span>Movies</span>
        </li>
        <li className="relative hover-half-underline cursor-pointer font-semibold">
          <span>SignUp</span>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
