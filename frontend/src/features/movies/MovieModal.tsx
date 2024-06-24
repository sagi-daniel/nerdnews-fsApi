import { useOutsideClick } from '../../hooks/useOutsideClick';
import { formatDateIsoToNormal, truncateText } from '../../utils/helpers';
import MovieModel from '../../models/Movie.model';
import CloseIcon from '../../components/CloseIcon';
import useLoaderHook from '../../hooks/useLoaderHook';

interface ModalProps {
  movie: MovieModel;
  closeModal: () => void;
}

function MovieModal({ movie, closeModal }: ModalProps) {
  const loaded = useLoaderHook(movie.poster);

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
          <div className={`relative size-full no-select z-1 overflow-hidden rounded-md`}>
            <div
              onClick={closeModal}
              className={`h-72  select-none justify-end px-2 py-5 rounded-md bg-cover bg-center ease-in-out hover:scale-110 transition-transform duration-500 ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url(${movie.poster})` }}
            />
          </div>
        </div>
        <div className="flex flex-col md:w-2/3">
          <h2 className="font-semibold mb-2">{movie.title}</h2>
          <p>Megjelenés: {formatDateIsoToNormal(movie.release)}</p>
          <p className="mt-2">{truncateText(movie.overview, 370)}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
