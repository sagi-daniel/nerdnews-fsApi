import useLoaderHook from '../../hooks/useLoaderHook';
import LoadingSpinner from './LoadingSpinner';

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  classes?: string;
  onClick?: () => void;
}

function ImageWithLoader({ src, alt, classes, onClick }: ImageWithLoaderProps) {
  const loaded = useLoaderHook(src);

  return (
    <div className="relative">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onClick={onClick}
        className={`${classes} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}

export default ImageWithLoader;
