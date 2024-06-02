import Divider from '../Divider';
import Logo from '../Logo';
import CopyRight from '../CopyRight';
import PrivacyPolicyLink from '../PrivacyPolicyLink';

function Footer() {
  return (
    <footer>
      <Divider color="neutral" />
      <div className=" mt-2 flex items-center pb-3 text-content-light dark:text-content-dark">
        <div className="w-full flex items-center justify-between">
          <Logo align="left" size="xsmall" />
          <CopyRight />
          <PrivacyPolicyLink />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
