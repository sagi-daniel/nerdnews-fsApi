import { BASE_URL } from '../utils/constants';

export async function getMovies() {
  const response = await fetch(`${BASE_URL}/upcomingmovie`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}
