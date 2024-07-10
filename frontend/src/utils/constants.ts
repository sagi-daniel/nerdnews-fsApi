import { FilterOption } from '../models/FiltersOption.model';

//SITE META
export const SITE_NAME = 'nerdnews';
export const SITE_DESCRIPTION = '';
export const CURRENT_YEAR = new Date().getFullYear();

//Options
export const QUERY_DEFAULT_OPTIONS = {
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
};
export const MENU_ITEMS = [
  { name: 'Főoldal', path: 'home', type: 'regular', element: 'Home' },
  { name: 'Hírek', path: 'news', type: 'regular', element: 'News' },
  {
    name: 'Filmek',
    path: 'movies',
    type: 'regular',
    element: 'UpcomingMovies',
  },
  /*TODO egyéb dropdown menu cidr ,quiz stb... */
  // { name: 'Egyéb', path: 'cidr', type: 'regular', element: 'IpCidrCalculator' },
];

export const USER_MENU_ITEMS = [
  { name: 'Felhasználói fiók', path: 'myAccount', type: 'regular', element: 'myAccount' },
  { name: 'Mentett hírek', path: 'myNews', type: 'regular', element: 'MyNews' },
  { name: 'Mentett filmek', path: 'myMovies', type: 'regular', element: 'MyMovies' },
];
export const ADMIN_MENU_TEMS = [
  { name: 'Felhasználók', path: 'editUsers', type: 'regular', element: 'EditUsers' },
  { name: 'Hírek', path: 'editNews', type: 'regular', element: 'EditNews' },
  { name: 'Filmek', path: 'editMovies', type: 'regular', element: 'EditMovies' },
  { name: 'Rss Források', path: 'editSources', type: 'regular', element: 'EditSources' },
  { name: 'Hír kategóriák', path: 'editCategories', type: 'regular', element: 'EditCategories' },
];

export const CATEGORY_ITEMS = [{ name: '', path: 'home', type: 'regular', element: 'Home' }];

export const CATEGORY_COLORS: FilterOption[] = [
  { name: 'ALL', colorClass: 'bg-primary text-primary-content' },
  { name: 'TECH', colorClass: 'bg-tech text-tech-content' },
  { name: 'CYBERSEC', colorClass: 'bg-cybersec text-cybersec-content' },
  { name: 'GAMING', colorClass: 'bg-gaming text-gaming-content' },
];

export const GENRE_COLORS: FilterOption[] = [
  { name: 'ALL', colorClass: 'bg-primary text-primary-content' },
  { name: 'ACTION', colorClass: 'bg-genre-action text-genre-action-content' },
  { name: 'CRIME', colorClass: 'bg-genre-crime text-genre-crime-content' },
  { name: 'HORROR', colorClass: 'bg-genre-horror text-genre-horror-content' },
  { name: 'THRILLER', colorClass: 'bg-genre-thriller text-genre-thriller-content' },
  { name: 'COMEDY', colorClass: 'bg-genre-comedy text-genre-comedy-content' },
  { name: 'FAMILY', colorClass: 'bg-genre-family text-genre-family-content' },
  { name: 'DRAMA', colorClass: 'bg-genre-drama text-genre-drama-content' },
  { name: 'ANIMATION', colorClass: 'bg-genre-animation text-genre-animation-content' },
  { name: 'ADVENTURE', colorClass: 'bg-genre-adventure text-genre-adventure-content' },
  { name: 'SCIENCE FICTION', colorClass: 'bg-genre-scifi text-genre-scifi-content' },
  { name: 'FANTASY', colorClass: 'bg-genre-fantasy text-genre-fantasy-content' },
  { name: 'ROMANCE', colorClass: 'bg-genre-romance text-genre-romance-content' },
];
//API URL
export const BASE_URL = 'http://localhost:8000';
// export const BASE_URL = 'https://nerdnews.hu';
