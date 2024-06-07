interface RatingsBarProps {
  rating: string;
}

function RatingsBar({ rating }: RatingsBarProps) {
  const getColor = (parsedRating: number): string => {
    if (parsedRating < 5) return 'bg-red-600 text-content-dark';
    if (parsedRating < 8) return 'bg-yellow-600 text-content-dark';
    if (parsedRating <= 10) return 'bg-green-600 text-content-dark';
    return 'bg-border-dark text-content-dark';
  };

  const parsedRating = parseFloat(rating);
  const color = getColor(parsedRating);
  const formattedRating = rating.split('.');

  return (
    <div className="absolute top-0 left-0 bg-bg-dark border border-white text-xs rounded-full size-12 flex items-center justify-center">
      <div className={`rounded-full size-12 flex items-center justify-center outline outline-2 ${color}`}>
        <p>
          {(parsedRating === 0 || rating === undefined) && <span className="text-lg font-semibold">NR</span>}
          {parsedRating !== 0 && (
            <>
              <span className="text-lg font-semibold">{formattedRating[0]}.</span>
              <small className="text-xxs">{formattedRating[1]}</small>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default RatingsBar;
