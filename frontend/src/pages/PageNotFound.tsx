import ErrorPage from '../components/ErrorPage';

function NotFound() {
  return (
    <ErrorPage
      errorCode="404"
      errorMessage="Oldal nem található"
      errorDescription="Az oldal, amit keresel, nem található."
    />
  );
}

export default NotFound;
