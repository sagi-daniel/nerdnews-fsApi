import useLoaderHook from '../../hooks/useLoaderHook';

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  rounded?: boolean;
  classes?: string;
  onClick?: () => void;
}

function ImageLoader({ src, alt, classes, rounded = true, onClick }: ImageWithLoaderProps) {
  const loaded = useLoaderHook(src);

  return (
    <div
      className={`relative no-select no-pointer-events size-full z-1 overflow-hidden ${
        rounded ? 'rounded-md' : 'rounded-t-md'
      }`}
    >
      <img
        src={src}
        alt={alt}
        onClick={onClick}
        className={`${classes} select-none w-full bg-cover bg-center ease-in-out hover:scale-110 transition-transform duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}

export default ImageLoader;
