import { RATING_COLOR_OPTIONS } from '../utils/constants';
import { getRatingColors } from '../utils/helpers';

// interface RatingColorOptions {
//   default: string;
//   under5: string;
//   under8: string;
//   under10: string;
// }

interface RatingsBarProps {
  rating: string;
}

function RatingsBar({ rating }: RatingsBarProps) {
  const { bgColor, textColor }: any = getRatingColors(rating, RATING_COLOR_OPTIONS);
  const formatedRating = rating.toString().split('.');

  return (
    <div className="absolute top-0 left-0  bg-bg-dark border border-white text-xs rounded-full size-12 flex items-center justify-center">
      <div className={`rounded-full size-12 flex items-center justify-center outline outline-2 ${bgColor}`}>
        <p className={`${textColor}`}>
          {(parseFloat(rating) === 0 || rating === undefined) && <span className="text-lg font-semibold">NR</span>}
          {parseFloat(rating) !== 0 && (
            <>
              <span className="text-lg font-semibold">{formatedRating[0]}.</span>
              <small className="text-xxs">{formatedRating[1]}</small>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default RatingsBar;
