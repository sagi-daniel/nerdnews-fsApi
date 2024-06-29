import { GoStarFill } from 'react-icons/go';

function SaveLaterSkeleton() {
  return (
    <span className=" absolute m-1 p-2 rounded-full bg-gray-700 top-1 left-1 text-2xl z-[5] text-gray-600 animate-pulse">
      <GoStarFill />
    </span>
  );
}

export default SaveLaterSkeleton;
