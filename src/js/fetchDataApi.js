const API_KEY = 'c05652c397b2dd01065e8cba4a8a45ab';
const BASE_URL = 'https://api.themoviedb.org/3';
const TREND_URL = `${BASE_URL}/trending/movie/week`;
const SEARCH_URL = `${BASE_URL}/search/movie`;
const SEARCH_ID_URL = `${BASE_URL}/movie/`;

const temp = `
https://api.themoviedb.org/3/movie/{movie_id}?api_key=c05652c397b2dd01065e8cba4a8a45ab`;

export async function getTrendMovieData(page) {
  const response = await fetch(`${TREND_URL}?api_key=${API_KEY}&page=${page}`);
  return await response.json();
}

export async function getSearchMovieData(query, page) {
  const response = await fetch(
    `${SEARCH_URL}?api_key=${API_KEY}&query=${query}&page=${page}&include_adult=false`
  );
  return await response.json();
}

export async function getSearchIdMovieData(movieId) {
  const response = await fetch(`${SEARCH_ID_URL}${movieId}?api_key=${API_KEY}`);
  return await response.json();
}
