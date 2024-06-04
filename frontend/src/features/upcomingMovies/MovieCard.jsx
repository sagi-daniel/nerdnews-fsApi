function MovieCard({ movie, onClick }) {
  return (
    <div className="relative cursor-pointer m-0.5 flex-[0_0_40%] sm:flex-[0_0_25%] lg:flex-[0_0_15%]">
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
