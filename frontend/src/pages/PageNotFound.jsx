import { useMoveBack } from '../hooks/useMoveBack';

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <div className="container-res">
      <div className="column">
        <h1 className="text-center text-8xl text-content-light dark:text-content-dark ">404</h1>
        <button onClick={moveBack} className="btn-primary-md">
          &larr; Vissza
        </button>
      </div>
    </div>
  );
}

export default PageNotFound;
