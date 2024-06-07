//SITE META
export const SITE_NAME = 'Portfolio';
export const SITE_DESCRIPTION = 'Ez egy portfolio oldal';
export const CURRENT_YEAR = new Date().getFullYear();

//APP
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
  // { name: 'Egyéb', path: 'cidr', type: 'regular', element: 'IpCidrCalculator' },
  { name: 'Regisztráció', path: 'signup', type: 'action', element: 'SignUp' },
];

export const CATEGORY_ITEMS = [{ name: '', path: 'home', type: 'regular', element: 'Home' }];

interface RatingColorOptions {
  default: string;
  under5: string;
  under8: string;
  under10: string;
}

export const RATING_COLOR_OPTIONS: RatingColorOptions = {
  default: 'bg-border-dark text-content-dark',
  under5: 'bg-red-600 text-content-dark',
  under8: 'bg-yellow-600 text-content-dark',
  under10: 'bg-green-600 text-content-dark',
};

//API URL
export const BASE_URL = 'http://localhost:8000';
