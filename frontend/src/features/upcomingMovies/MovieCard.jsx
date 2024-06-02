function MovieCard({ movie, onClick }) {
  return (
    <div className="movie-card relative">
      <img
        src={movie.poster}
        alt={movie.title}
        onClick={() => onClick(movie)}
        className="my-1 hover-outline-highlight"
      />
    </div>
  );
}

export default MovieCard;
