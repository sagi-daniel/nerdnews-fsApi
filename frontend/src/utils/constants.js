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
  { name: 'Filmek', path: 'movies', type: 'regular', element: 'UpcomingMovies' },
  // { name: 'Egyéb', path: 'cidr', type: 'regular', element: 'IpCidrCalculator' },
  // { name: 'Regisztráció', path: 'signup', type: 'action', element: 'SignUp' },
];

//API URL
export const BASE_URL = 'http://localhost:8000';
