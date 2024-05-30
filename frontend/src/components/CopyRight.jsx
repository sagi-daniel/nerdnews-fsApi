function CopyRight() {
  const year = new Date().getFullYear();
  return <p className="text-xxs md:text-xs lg:text-sm">&copy;{year} geekHUB. Minden jog fenntartva!</p>;
}

export default CopyRight;
