import useLoaderHook from '../../hooks/useLoaderHook';

interface ImageWithLoaderProps {
  src: string;
  rounded?: boolean;
  classes?: string;
  onClick?: () => void;
}

function ImageLoader({ src, classes, rounded = true, onClick }: ImageWithLoaderProps) {
  const loaded = useLoaderHook(src);

  return (
    <div className={`relative size-full no-select z-1 overflow-hidden ${rounded ? 'rounded-md' : 'rounded-t-md'}`}>
      <div
        onClick={onClick}
        className={`${classes} select-none justify-end px-2 py-5 rounded-md bg-cover bg-center ease-in-out hover:scale-110 transition-transform duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ backgroundImage: `url(${src})` }}
      />
    </div>
  );
}

export default ImageLoader;
