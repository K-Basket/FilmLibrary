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

import { getTrendMovieData } from './fetchDataApi';

import {
  getMovieId,
  createMovieCard,
  renderMovieGallery,
  addSmoothScroling,
} from './fn-project';

btnHomeEl.addEventListener('click', onGoHome);
btnMyLibraryEl.addEventListener('click', onGoMyLibrary);
window.addEventListener('load', onRenderMovieGallery);
movieListEl.addEventListener('click', onClickMovie);
btnLoadMoreEl.addEventListener('click', onRenderMovieGallery);

let page = 1;

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

async function onRenderMovieGallery() {
  try {
    const data = await getTrendMovieData(page);
    console.log('Trending', data);

    renderMovieGallery(movieListEl, createMovieCard(data.results));

    page += 1;
    addSmoothScroling(movieListEl);
  } catch (error) {
    console.warn(error);
  }
}

async function onClickMovie(evt) {
  console.log(getMovieId(evt));
}
