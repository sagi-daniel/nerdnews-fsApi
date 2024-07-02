import { formatDateIsoToNormal, truncateText } from '../../utils/helpers';
import MovieModel from '../../models/Movie.model';
import useLoaderHook from '../../hooks/useLoaderHook';
import SaveLater from '../../components/SaveLater';

interface ModalProps {
  movie: MovieModel;
}

function MovieModal({ movie }: ModalProps) {
  const loaded = useLoaderHook(movie.poster);

  return (
    <div className="flex justify-center items-center py-5 size-full gap-4">
      <div className="flex h-full md:w-1/3">
        <div className={`relative size-full no-select z-1 overflow-hidden rounded-md`}>
          <img
            className={` select-none  rounded-md   ${loaded ? 'opacity-100' : 'opacity-0'}`}
            src={movie.poster}
            alt={movie.title}
          />
          <SaveLater itemId={movie._id} type="movie" />
        </div>
      </div>
      <div className="flex flex-col md:w-2/3">
        <h2 className="font-semibold mb-2">{movie.title}</h2>
        <p>Megjelenés: {formatDateIsoToNormal(movie.release)}</p>
        <p className="mt-2">{truncateText(movie.overview, 370)}</p>
      </div>
    </div>
  );
}

export default MovieModal;
