import { useState, useEffect } from 'react';

function useImageLoader(src: string) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => setLoaded(true);
    image.onerror = () => setLoaded(false);
  }, [src]);

  return loaded;
}

export default useImageLoader;
