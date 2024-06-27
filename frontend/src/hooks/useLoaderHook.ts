import { useState, useEffect } from 'react';

function useLoaderHook(src: string) {
  const [loadedSrc, setLoadedSrc] = useState<string>('');

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => setLoadedSrc(src);
    image.onerror = () => setLoadedSrc('/assets/image/placeholder.png');
  }, [src]);

  return loadedSrc;
}

export default useLoaderHook;
