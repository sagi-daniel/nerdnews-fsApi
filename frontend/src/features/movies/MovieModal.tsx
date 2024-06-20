import { useOutsideClick } from '../../hooks/useOutsideClick';
import { formatDateIsoToNormal } from '../../utils/helpers';
import ImageLoader from '../../components/loaders/ImageLoader';
import MovieModel from '../../models/Movie.model';
import CloseIcon from '../../components/CloseIcon';

interface ModalProps {
  movie: MovieModel;
  closeModal: () => void;
}

function MovieModal({ movie, closeModal }: ModalProps) {
  const modalRef = useOutsideClick({
    handler: closeModal,
    listenCapturing: true,
  });

  return (
    <div className="z-20 fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div
        ref={modalRef}
        className="relative flex flex-col md:flex-row gap-5 w-1/2 md:w-1/3 modal-content bg-bg-light dark:bg-bg-dark rounded-md shadow-md p-4"
      >
        <CloseIcon onClick={closeModal} />
        <div className="flex h-full md:w-1/3">
          <ImageLoader src={movie.poster} classes="rounded-md h-72" />
        </div>
        <div className="flex flex-col md:w-2/3">
          <h2 className="font-semibold mb-2">{movie.title}</h2>
          <p>Megjelenés: {formatDateIsoToNormal(movie.release)}</p>
          <p className="mt-2">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
