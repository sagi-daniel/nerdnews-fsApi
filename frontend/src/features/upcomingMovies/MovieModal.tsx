interface ModalProps {
  closeModal: () => void;
  title: string;
  releaseDate: string;
  overview: string;
}

function Modal({ closeModal, title, releaseDate, overview }: ModalProps) {
  return (
    <div className="z-20 fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex flex-wrap items-center justify-center">
      <div className="modal-content w-1/2 bg-white rounded-lg shadow-md p-4">
        <button onClick={closeModal} className="text-gray-500">
          X
        </button>
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-sm text-gray-700">Release Date: {releaseDate}</p>
        <p className="text-sm text-gray-700 mt-2">{overview}</p>
      </div>
    </div>
  );
}

export default Modal;
