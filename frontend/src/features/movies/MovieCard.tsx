import ImageLoader from '../../components/loaders/ImageLoader';

import MovieModel from '../../models/Movie.model';

interface MovieCardProps {
  movie: MovieModel;
  onClick: (movie: MovieModel) => void;
}

function MovieCard({ movie, onClick }: MovieCardProps) {
  return (
    <div className="relative cursor-pointer p-2 m-0.5 flex-[0_0_40%] sm:flex-[0_0_25%] lg:flex-[0_0_15%]">
      <ImageLoader
        src={movie.poster}
        alt={movie.title}
        onClick={() => onClick(movie)}
        classes="my-1 rounded-md hover-outline-highlight "
      />
    </div>
  );
}

export default MovieCard;
