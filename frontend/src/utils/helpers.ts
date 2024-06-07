import { formatDistance, parseISO } from 'date-fns';
import { differenceInDays } from 'date-fns';
import RatingColors from '../models/RaingColors.model';

type DateInput = string | Date;

interface GetTodayOptions {
  end?: boolean;
}

interface RatingColorOptions {
  default: string;
  under5: string;
  under8: string;
  under10: string;
}

export const subtractDates = (dateStr1: DateInput, dateStr2: DateInput): number =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr: string): string =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace('about ', '')
    .replace('in', 'In');

export const getToday = (options: GetTodayOptions = {}): string => {
  const today = new Date();

  if (options?.end) {
    today.setUTCHours(23, 59, 59, 999);
  } else {
    today.setUTCHours(0, 0, 0, 0);
  }

  return today.toISOString();
};

export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(value);

export const formatDateIsoToNormal = (isoDate: string): string => {
  const date = new Date(isoDate);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}.${month}.${day}`;
};

export const truncateText = (text: string, trunc: number): string => {
  if (text.length <= trunc) {
    return text;
  }
  return text.slice(0, trunc) + '...';
};

export const getRatingColors = (rating: string | number, ratingColorOptions: RatingColorOptions): RatingColors => {
  const parsedRating = parseFloat(rating as string);

  if (parsedRating === 0 || rating === undefined) {
    return {
      bgColor: ratingColorOptions.default,
      textColor: ratingColorOptions.default,
    };
  } else if (parsedRating < 5) {
    return {
      bgColor: ratingColorOptions.under5,
      textColor: ratingColorOptions.under5,
    };
  } else if (parsedRating < 8) {
    return {
      bgColor: ratingColorOptions.under8,
      textColor: ratingColorOptions.under8,
    };
  } else if (parsedRating <= 10) {
    return {
      bgColor: ratingColorOptions.under10,
      textColor: ratingColorOptions.under10,
    };
  } else {
    return {
      bgColor: ratingColorOptions.default,
      textColor: ratingColorOptions.default,
    };
  }
};
