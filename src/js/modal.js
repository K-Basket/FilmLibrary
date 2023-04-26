import { movieListEl, backdropEl, modalCloseEl, modalEl } from './elements';
import { getMovieId, createMovieModal, renderMovieGallery } from './fn-project';
import { getSearchIdMovieData } from './fetchDataApi';

movieListEl.addEventListener('click', onOpenModal);
modalCloseEl.addEventListener('click', onCloseModal);
backdropEl.addEventListener('click', onClickBackdrop);
window.addEventListener('keydown', onEscKeydown);

async function onOpenModal(evt) {
  // console.log(getMovieId(evt));
  // console.log(modalEl);

  const movieId = getMovieId(evt);
  console.log(movieId);

  if (getMovieId(evt)) {
    document.body.classList.add('show-modal', 'stop-scroll');
  }

  try {
    const data = await getSearchIdMovieData(movieId);
    console.log('Id Film', data);

    modalEl.insertAdjacentHTML('beforeend', createMovieModal(data));
  } catch (error) {
    console.warn(error);
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
