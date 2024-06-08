import useLoaderHook from '../../hooks/useLoaderHook';
import Error from '../Error';
import LoadingSpinner from './LoadingSpinner';

interface GridItemImageLoader {
  src?: string;
}

function GridItemImageLoader({ src }: GridItemImageLoader) {
  if (!src) return <Error message="Error" />;
  const loaded = useLoaderHook(src);

  return (
    <div className="relative size-full z-[-999]">
      {!loaded && <LoadingSpinner />}
      {loaded && (
        <div
          className={`hover:opacity-40 justify-end h-full px-2 py-5 rounded-md bg-cover bg-center ease-in-out hover:scale-110 z-[-999] transition-opacity duration-500 ${
            loaded ? 'opacity-30' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${src})` }}
        ></div>
      )}
    </div>
  );
}

export default GridItemImageLoader;
