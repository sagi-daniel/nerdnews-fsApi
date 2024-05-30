import Divider from '../Divider';
import Logo from '../Logo';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <Divider color="neutral" />
      <div className=" mt-2 flex items-center pb-3 text-content-light dark:text-content-dark">
        <div className="w-full flex items-center justify-between">
          <Logo align="left" size="xsmall" />

          <p className="text-xxs md:text-xs lg:text-sm">&copy;{year} geekHUB. Minden jog fenntartva!</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
