import { truncateText } from '../../utils/helpers';
import { format } from 'date-fns';
import MovieModel from '../../models/Movie.model';

interface ModalProps {
  movie: MovieModel;
}

function MovieModal({ movie }: ModalProps) {
  return (
    <div className="flex flex-col justify-center  gap-2">
      <h2 className="font-semibold mb-2">{movie.title}</h2>
      <p>Megjelenés: {format(movie.release, 'yyyy.MM.dd.')}</p>
      <p className="mt-2">{truncateText(movie.overview, 370)}</p>
    </div>
  );
}

export default MovieModal;
