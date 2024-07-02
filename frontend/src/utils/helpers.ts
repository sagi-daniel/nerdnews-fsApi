import { formatDistance, parseISO } from 'date-fns';
import { differenceInDays } from 'date-fns';

type DateInput = string | Date;

interface GetTodayOptions {
  end?: boolean;
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

export const formatDateIsoToNormal = (isoDate: string | undefined): string => {
  if (!isoDate) return '';
  const date = new Date(isoDate);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}.${month}.${day}`;
};

export const truncateText = (text: string | undefined, trunc: number | undefined): string => {
  if (!text || !trunc) return '';
  if (text.length <= trunc) {
    return text;
  }
  return text.slice(0, trunc) + '...';
};

export const generateRandomPassword = (): string => {
  const length = 12;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
};

export const capitalizeWord = (word: string | undefined): string => {
  if (typeof word !== 'string' || word.length === 0) {
    return '';
  }
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};
