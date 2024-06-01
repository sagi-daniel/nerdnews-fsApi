function MovieCard({ movie, onClick }) {
  return (
    <div className="movie-card relative">
      <img
        src={movie.poster}
        alt={movie.title}
        onClick={() => onClick(movie)}
        className=" my-1 hover: hover:outline hover:outline-border-dark hover:dark:outline-border-light rounded-md"
      />
    </div>
  );
}

export default MovieCard;
