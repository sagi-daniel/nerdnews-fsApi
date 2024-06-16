import ImageLoader from '../../components/loaders/ImageLoader';
import ImageSkeleton from '../../components/loaders/skeletons/ImageSkeleton';
import useLoaderHook from '../../hooks/useLoaderHook';
import MovieModel from '../../models/Movie.model';

interface MovieCardProps {
  movie: MovieModel;
  onClick: (movie: MovieModel) => void;
}

function MovieCard({ movie, onClick }: MovieCardProps) {
  const loaded = useLoaderHook(movie.poster);

  if (!loaded) return <ImageSkeleton />;

  return (
    <div className="relative cursor-pointer flex-[0_0_40%] sm:flex-[0_0_25%] lg:flex-[0_0_15%] rounded-md">
      <ImageLoader
        src={movie.poster}
        alt={movie.title}
        onClick={() => onClick(movie)}
        classes="h-full w-full rounded-md"
      />
    </div>
  );
}

export default MovieCard;
