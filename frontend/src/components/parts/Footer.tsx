import Divider from '../Divider';
import Logo from '../Logo';
import CustomNavLink from '../CustomNavLink';
import { CURRENT_YEAR, SITE_NAME } from '../../utils/constants';

function Footer() {
  return (
    <footer>
      <Divider color="neutral" />
      <div className=" mt-2 flex justify-center items-center pb-3 text-content-light dark:text-content-dark">
        <div className="w-full flex items-center justify-between">
          <Logo align="left" size="xsmall" />
          <CustomNavLink
            text={`©${CURRENT_YEAR} ${SITE_NAME}. Minden jog fenntartva!`}
            path="/"
            className="text-xxs md:text-xs lg:text-sm text-center"
          />
          <CustomNavLink
            text="Adatkezelési tájékoztató"
            path="/privacy-policy"
            className="text-xxs md:text-xs lg:text-sm text-center"
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
