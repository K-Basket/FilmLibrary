import { movieListEl, backdropEl, modalCloseEl } from './elements';
import { getMovieId } from './fn-project';

movieListEl.addEventListener('click', onOpenModal);
modalCloseEl.addEventListener('click', onCloseModal);
backdropEl.addEventListener('click', onClickBackdrop);
window.addEventListener('keydown', onEscKeydown);

function onOpenModal(evt) {
  console.log(getMovieId(evt));

  if (getMovieId(evt)) {
    document.body.classList.add('show-modal', 'stop-scroll');
  }
}

function onCloseModal() {
  document.body.classList.remove('show-modal', 'stop-scroll');
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
