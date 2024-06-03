import { useRef, useState, useEffect } from 'react';
import SliderButton from './SliderButton';

function Slider({ items }) {
  const sliderRef = useRef(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const handleScroll = () => {
    const slider = sliderRef.current;
    if (slider) {
      const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
      const percentage = (slider.scrollLeft / maxScrollLeft) * 100;
      setScrollPercentage(percentage);
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial call to set the initial state
    }
    return () => {
      if (slider) {
        slider.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const handleLeftClick = () => {
    sliderRef.current.scrollBy({
      left: -sliderRef.current.clientWidth,
      behavior: 'smooth',
    });
  };

  const handleRightClick = () => {
    sliderRef.current.scrollBy({
      left: sliderRef.current.clientWidth,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative">
      <div ref={sliderRef} className="movie-slider" onScroll={handleScroll}>
        {items.map((item, index) => (
          <div key={index} className="movie-card flex-shrink-0">
            {item}
          </div>
        ))}
      </div>
      <div className="slider bg-border-light dark:bg-border-dark ">
        <div className="slider-fill bg-primary" style={{ width: `${scrollPercentage}%` }}></div>
      </div>
      {scrollPercentage > 0 && <SliderButton direction="left" onClick={handleLeftClick} />}
      {scrollPercentage < 100 && <SliderButton direction="right" onClick={handleRightClick} />}
    </div>
  );
}

export default Slider;
