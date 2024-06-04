import { useRef, useState } from 'react';
import SliderButton from './SliderButton';
import { Link } from 'react-router-dom';

function Slider({ children, moreLabel, morePath }) {
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

  return (
    <div className="relative overflow-hidden scroll-smooth">
      <div ref={sliderRef} className="flex gap-2 overflow-x-scroll scrollbar-hide" onScroll={handleScroll}>
        {children}
      </div>

      <div className="relative h-1.5 my-5 rounded-full bg-border-light dark:bg-border-dark">
        <div
          className="absolute top-0 left-0 h-full rounded-full bg-border-dark dark:bg-primary"
          style={{ width: `${scrollPercentage}%` }}
        ></div>
      </div>
      {scrollPercentage > 0 && <SliderButton direction="left" sliderRef={sliderRef} />}
      {scrollPercentage < 99 && <SliderButton direction="right" sliderRef={sliderRef} />}
      <div className="flex justify-end hover:dark:text-primary">
        <Link to={morePath}>{moreLabel}</Link>
      </div>
    </div>
  );
}

export default Slider;
