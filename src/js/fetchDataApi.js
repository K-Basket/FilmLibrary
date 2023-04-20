const API_KEY = 'c05652c397b2dd01065e8cba4a8a45ab';
const BASE_URL = 'https://api.themoviedb.org/3';
const TREND_URL = `${BASE_URL}/trending/movie/week`;

export async function getTrendMovieData(page) {
  const response = await fetch(`${TREND_URL}?api_key=${API_KEY}&page=${page}`);
  return await response.json();
}
