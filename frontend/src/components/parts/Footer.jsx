import Divider from '../Divider';
import Logo from '../Logo';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <Divider color="neutral" />
      <footer className=" flex items-center mb-3 text-content-light dark:text-content-dark">
        <div className="w-full flex items-center justify-between">
          <Logo align="left" size="small" />

          <p className="text-sm">&copy;{year} geekHUB. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
