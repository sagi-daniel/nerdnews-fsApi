import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

function SliderButton({ direction, onClick, sliderRef }) {
  const directionStyle = {
    left: 'left-0',
    right: 'right-0',
  };

  const handleScroll = (direction) => {
    const scrollAmount = sliderRef.current.clientWidth;
    sliderRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={() => handleScroll(direction)}
      className={`${directionStyle[direction]} hover-outline-highlight absolute m-0 mx-1.5 p-1.5 top-[45%] transform -translate-y-1/2 bg-black bg-opacity-60 text-white border-none cursor-pointer z-10 hover:bg-opacity-80`}
    >
      {direction === 'left' ? <FiChevronLeft size={30} /> : <FiChevronRight size={30} />}
    </button>
  );
}

export default SliderButton;
