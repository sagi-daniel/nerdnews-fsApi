import Divider from '../Divider';
import Logo from '../Logo';
import CustomNavLink from '../CustomNavLink';
import { CURRENT_YEAR, SITE_NAME } from '../../utils/constants';

function Footer() {
  return (
    <footer>
      <Divider color="neutral" />
      <div className=" mt-2 w-full flex-wrap flex items-center justify-between pb-3 text-content-light dark:text-content-dark">
        <div className="flex w-1/2 md:w-1/3">
          <Logo align="left" size="xsmall" />
        </div>
        <div className="w-1/2 md:w-2/3 h-full flex flex-col-reverse gap-3 md:flex-row ">
          <div className="flex w-full justify-end md:justify-center">
            <CustomNavLink
              text={`©${CURRENT_YEAR} ${SITE_NAME}. Minden jog fenntartva!`}
              path="/"
              className="text-xxs md:text-xs lg:text-sm text-center"
            />
          </div>
          <div className="flex w-full justify-end">
            <CustomNavLink
              text="Adatkezelési tájékoztató"
              path="/privacy-policy"
              className="text-xxs md:text-xs lg:text-sm text-center"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
