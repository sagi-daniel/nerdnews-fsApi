import { FiX } from 'react-icons/fi';
import { formatDateIsoToNormal } from '../../utils/helpers';
import ImageLoader from '../../components/loaders/ImageLoader';
import MovieModel from '../../models/Movie.model';

interface ModalProps {
  movie: MovieModel;
  closeModal: () => void;
}

function Modal({ movie, closeModal }: ModalProps) {
  return (
    <div className="z-20  fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex flex-wrap items-center justify-center">
      <div className="relative flex flex-col md:flex-row gap-5 w-1/2 md:w-1/3  modal-content bg-bg-light dark:bg-bg-dark rounded-md shadow-md p-4">
        <button onClick={closeModal} className="absolute top-2 right-2 dark:text-primary">
          <FiX className="text-xl" />
        </button>
        <div className="flex md:w-1/3 ">
          <ImageLoader src={movie.poster} alt={movie.title} classes="rounded-md" />
        </div>

        <div className="flex flex-col md:w-2/3">
          <h2 className=" font-semibold mb-2">{movie.title}</h2>
          <p className=" ">Megjelenés: {formatDateIsoToNormal(movie.release)}</p>
          <p className="  mt-2">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default Modal;
