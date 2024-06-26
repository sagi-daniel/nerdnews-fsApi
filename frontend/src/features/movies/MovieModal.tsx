import { formatDateIsoToNormal, truncateText } from '../../utils/helpers';
import MovieModel from '../../models/Movie.model';
import useLoaderHook from '../../hooks/useLoaderHook';
import FormModal from '../../components/FormModal';

interface ModalProps {
  movie: MovieModel;
  closeModal: () => void;
}

function MovieModal({ movie, closeModal }: ModalProps) {
  const loaded = useLoaderHook(movie.poster);

  return (
    <FormModal title="" closeModal={closeModal}>
      <div className="flex size-full gap-4">
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
    </FormModal>
  );
}

export default MovieModal;
