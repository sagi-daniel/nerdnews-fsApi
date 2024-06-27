import ErrorPage from '../components/ErrorPage';

function Forbidden() {
  return (
    <ErrorPage
      errorCode="403"
      errorMessage="Hozzáférés megtagadva"
      errorDescription="Úgy tűnik, nincs megfelelő jogosultságod az oldal megtekintéséhez."
    />
  );
}

export default Forbidden;
