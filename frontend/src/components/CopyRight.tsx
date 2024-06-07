import { CURRENT_YEAR, SITE_NAME } from "../utils/constants";

function CopyRight() {
  return (
    <small className="text-xxs md:text-xs lg:text-sm">
      &copy;{CURRENT_YEAR} {SITE_NAME}. Minden jog fenntartva!
    </small>
  );
}

export default CopyRight;
