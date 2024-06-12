import useLoaderHook from '../../hooks/useLoaderHook';
import LoadingSpinner from './LoadingSpinner';

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  classes?: string;
  onClick?: () => void;
}

function ImageLoader({ src, alt, classes, onClick }: ImageWithLoaderProps) {
  const loaded = useLoaderHook(src);

  return (
    <div className="relative size-full z-1 overflow-hidden ">
      {!loaded && <LoadingSpinner />}

      <img
        src={src}
        alt={alt}
        onClick={onClick}
        className={`${classes} bg-cover bg-center ease-in-out hover:scale-110 transition-transform duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}

export default ImageLoader;
