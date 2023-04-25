console.log('💙💛 K-Basket');

import {
  movieListEl,
  btnHomeEl,
  btnMyLibraryEl,
  formSearchEl,
  btnWatchedEl,
  btnQueueEl,
  btnLoadMoreEl,
} from './elements';

import { getTrendMovieData, getSearchMovieData } from './fetchDataApi';

import {
  createMovieCard,
  renderMovieGallery,
  addSmoothScroling,
  removesBtnLoadMore,
} from './fn-project';

btnHomeEl.addEventListener('click', onGoHome);
btnMyLibraryEl.addEventListener('click', onGoMyLibrary);
window.addEventListener('load', onTrendMovie);
btnLoadMoreEl.addEventListener('click', onTrendMovie);
formSearchEl.addEventListener('submit', onSearchMovie);

let page = 1;
let query = '';

function onGoHome() {
  btnHomeEl.classList.add('btn-black');
  btnMyLibraryEl.classList.remove('btn-black');
  formSearchEl.classList.remove('visually-hidden');
  btnWatchedEl.classList.add('visually-hidden');
  btnQueueEl.classList.add('visually-hidden');
}

function onGoMyLibrary() {
  btnHomeEl.classList.remove('btn-black');
  btnMyLibraryEl.classList.add('btn-black');
  formSearchEl.classList.add('visually-hidden');
  btnWatchedEl.classList.remove('visually-hidden');
  btnQueueEl.classList.remove('visually-hidden');
}

async function onTrendMovie() {
  try {
    const data = await getTrendMovieData(page);
    console.log('Trending', data);

    renderMovieGallery(movieListEl, createMovieCard(data.results));
    removesBtnLoadMore(btnLoadMoreEl, data);

    if (page !== 1) {
      addSmoothScroling(movieListEl);
    }

    page += 1;
  } catch (error) {
    console.warn(error);
  }
}

async function onSearchMovie(evt) {
  evt.preventDefault();

  query = evt.currentTarget.searchQuery.value;

  if (query === '') {
    return;
  }

  movieListEl.innerHTML = '';

  page = 1;

  btnLoadMoreEl.removeEventListener('click', onTrendMovie);
  btnLoadMoreEl.addEventListener('click', onSearchLoadMore);

  evt.currentTarget.reset();

  try {
    const data = await getSearchMovieData(query, page);
    console.log('Search', data);

    renderMovieGallery(movieListEl, createMovieCard(data.results));
    removesBtnLoadMore(btnLoadMoreEl, data);

    page += 1;
  } catch (error) {
    console.log(error);
  }
}

async function onSearchLoadMore() {
  try {
    const data = await getSearchMovieData(query, page);
    console.log('SearchLoadMoree', data);

    renderMovieGallery(movieListEl, createMovieCard(data.results));
    addSmoothScroling(movieListEl);
    removesBtnLoadMore(btnLoadMoreEl, data);

    page += 1;
  } catch (error) {
    console.log(error);
  }
}
