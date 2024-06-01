//BRAND META
export const SITE_NAME = 'geekHUB';
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
  { name: 'Home', path: 'home', type: 'regular', element: 'Home' },
  { name: 'News', path: 'news', type: 'regular', element: 'News' },
  { name: 'Movies', path: 'movies', type: 'regular', element: 'UpcomingMovies' },
  { name: 'IP-Calc', path: 'cidr', type: 'regular', element: 'IpCidrCalculator' },
  { name: 'Sign up', path: 'signup', type: 'action', element: 'SignUp' },
];

//API CALLS
export const BASE_URL = 'http://localhost:8000';
