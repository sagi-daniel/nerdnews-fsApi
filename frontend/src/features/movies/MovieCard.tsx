import SaveLater from '../../components/SaveLater';
import MovieCardSkeleton from '../../components/loaders/skeletons/MovieCardSkeleton';
import useLoaderHook from '../../hooks/useLoaderHook';
import MovieModel from '../../models/Movie.model';

interface MovieCardProps {
  movie: MovieModel;
  onClick: (movie: MovieModel) => void;
}

function MovieCard({ movie, onClick }: MovieCardProps) {
  const loaded = useLoaderHook(movie.poster);

  if (!loaded) return <MovieCardSkeleton />;

  return (
    <div className="relative h-72 cursor-pointer flex-[0_0_40%] sm:flex-[0_0_25%] lg:flex-[0_0_15%] ">
      <div className={`relative size-full  no-select overflow-hidden rounded-md`}>
        <SaveLater itemId={movie._id} type="movie" />
        <div
          onClick={() => onClick(movie)}
          className={`size-full  select-none justify-end rounded-md bg-cover bg-center ease-in-out hover:scale-105 transition-transform duration-500 `}
          style={{ backgroundImage: `url(${movie.poster})` }}
        />
      </div>
    </div>
  );
}

export default MovieCard;
