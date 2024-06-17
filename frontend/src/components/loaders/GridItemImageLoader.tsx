import useLoaderHook from '../../hooks/useLoaderHook';

interface GridItemImageLoader {
  src: string;
}

function GridItemImageLoader({ src }: GridItemImageLoader) {
  const loaded = useLoaderHook(src);

  return (
    <div className="relative no-select size-full z-[-999] overflow-hidden">
      <div
        className={`select-none hover:opacity-40 justify-end h-full px-2 py-5 rounded-md bg-cover bg-center ease-in-out hover:scale-110 transition-transform duration-500 ${
          loaded ? 'opacity-30' : 'opacity-0'
        }`}
        style={{ backgroundImage: `url(${src})` }}
      ></div>
    </div>
  );
}

export default GridItemImageLoader;
