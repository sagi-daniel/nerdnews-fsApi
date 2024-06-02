import { Link } from 'react-router-dom';

function PrivacyPolicyLink() {
  return (
    <Link to="privacy-policy" className="text-content-light dark:text-primary hover:underline">
      <small className="text-xxs md:text-xs lg:text-sm"> Adatkezelési tájékoztató</small>
    </Link>
  );
}

export default PrivacyPolicyLink;
