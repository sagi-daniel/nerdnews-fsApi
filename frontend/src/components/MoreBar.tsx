import { FiMoreVertical } from 'react-icons/fi';

function MoreBar() {
  return (
    <span className="absolute top-q left-0 bg-border-dark opacity-90 hover:opacity-100 py-1 px-2 rounded-md text-3xl text-content-dark cursor-pointer z-[5]">
      <FiMoreVertical />
    </span>
  );
}

export default MoreBar;
