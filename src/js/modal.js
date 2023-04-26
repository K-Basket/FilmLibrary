import { movieListEl, backdropEl, modalCloseEl, modalEl } from './elements';
import {
  getMovieId,
  createMovieModal,
  renderMovieGallery,
  saveToLocalStorage,
  loadFromLocalStorage,
  createArrayLocalStorage,
} from './fn-project';
import { getSearchIdMovieData } from './fetchDataApi';

movieListEl.addEventListener('click', onOpenModal);
modalCloseEl.addEventListener('click', onCloseModal);
backdropEl.addEventListener('click', onClickBackdrop);
window.addEventListener('keydown', onEscKeydown);
modalEl.addEventListener('click', onClickWatchQueue);

let movieId = null;

async function onOpenModal(evt) {
  movieId = getMovieId(evt);

  if (getMovieId(evt)) {
    document.body.classList.add('show-modal', 'stop-scroll');
  }

  try {
    const data = await getSearchIdMovieData(movieId);
    // console.log('Id Film', data);

    renderMovieGallery(modalEl, createMovieModal(data));
  } catch (error) {
    console.warn(error);
  }

  // Добавить переименование кнопок под этой записью!!!
  console.log(document.querySelector('#add-to-watched'));

  console.log('Global:', movieId); // temp
}

function onClickWatchQueue(evt) {
  addIdToLocalStorage(evt, 'watched');
  addIdToLocalStorage(evt, 'queue');
}

function addIdToLocalStorage(evt, nameBtn) {
  // const btnWatched = evt.target.dataset.action;
  const btnWatched = evt.target.dataset.action;

  createArrayLocalStorage(nameBtn);

  let dataLocalStorage = loadFromLocalStorage(nameBtn);

  if (btnWatched !== nameBtn) {
    return;
  }

  if (!dataLocalStorage.includes(movieId)) {
    dataLocalStorage.push(movieId);
    saveToLocalStorage(nameBtn, dataLocalStorage);

    evt.target.textContent = `Remove from ${nameBtn}`;
  } else {
    dataLocalStorage.splice(dataLocalStorage.indexOf(movieId), 1);
    saveToLocalStorage(nameBtn, dataLocalStorage);

    evt.target.textContent = `Add to ${nameBtn}`;
  }
}

function onCloseModal() {
  document.body.classList.remove('show-modal', 'stop-scroll');
  modalEl.innerHTML = '';
}

function onClickBackdrop(evt) {
  if (evt.currentTarget === evt.target) {
    onCloseModal();
  }
}

function onEscKeydown(evt) {
  if (evt.code === 'Escape') {
    onCloseModal();
  }
}
