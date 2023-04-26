import { movieListEl, backdropEl, modalCloseEl, modalEl } from './elements';
import {
  getMovieId,
  createMovieModal,
  renderMovieGallery,
  saveToLocalStorage,
  loadFromLocalStorage,
  createArrayLocalStorage,
  addAccentColor,
  removeLocalStorage,
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

  if (!getMovieId(evt)) {
    return;
  }

  createArrayLocalStorage('watched');
  createArrayLocalStorage('queue');

  document.body.classList.add('show-modal', 'stop-scroll');

  try {
    const data = await getSearchIdMovieData(movieId);

    renderMovieGallery(modalEl, createMovieModal(data));
  } catch (error) {
    console.warn(error);
  }

  renameBtn('watched', movieId);
  renameBtn('queue', movieId);

  console.log('Movie ID:', movieId); // temp
}

function onClickWatchQueue(evt) {
  addIdToLocalStorage(evt, 'watched');
  addIdToLocalStorage(evt, 'queue');
}

function addIdToLocalStorage(evt, nameBtn) {
  const modalBtn = evt.target;

  // createArrayLocalStorage(nameBtn);

  let dataLocalStorage = loadFromLocalStorage(nameBtn);

  if (modalBtn.dataset.action !== nameBtn) {
    return;
  }

  if (!dataLocalStorage.includes(movieId)) {
    dataLocalStorage.push(movieId);
    saveToLocalStorage(nameBtn, dataLocalStorage);

    modalBtn.textContent = `Remove from ${nameBtn}`;
    addAccentColor(modalBtn);
  } else {
    dataLocalStorage.splice(dataLocalStorage.indexOf(movieId), 1);
    saveToLocalStorage(nameBtn, dataLocalStorage);

    modalBtn.textContent = `Add to ${nameBtn}`;
    addAccentColor(modalBtn);
  }
}

function renameBtn(key, id) {
  const modalBtn = document.querySelector(`#add-to-${key}`);

  if (loadFromLocalStorage(key).includes(id)) {
    modalBtn.textContent = `Remove from ${key}`;
    addAccentColor(modalBtn);
  }
}

function onCloseModal() {
  removeLocalStorage('watched');
  removeLocalStorage('queue');

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
