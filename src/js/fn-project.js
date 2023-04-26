// 💙💛 Koshyk Kostiantyn

// сооздает разметку карточки фильма для главной страницы
export function createMovieCard(movies) {
  return movies
    .map(el => {
      return `
<li class="movie-item" id="movie-item" data-id="${el.id}">
  <article class="movie article">
    <div class="movie-card-thumb">
      ${
        el.poster_path
          ? `
      <img
        src="https://image.tmdb.org/t/p/w500${el.poster_path}"
        alt="poster ${el.title}"
      />`
          : `<img
        src="https://image.tmdb.org/t/p/w500/dykOcAqI01Fci5cKQW3bEUrPWwU.jpg"
        alt="poster none"
      />`
      }
    </div>
    <div class="movie-content">
      <h3 class="movie-title">${el.title}</h3>
      <p class="movie-genre">${el.genre_ids} | ${el.release_date}</p>
    </div>
  </article>
</li>`;
    })
    .join('');
}

// создает разметку карточки для моодального окна
export function createMovieModal(movie) {
  return `
  <div class="modal-poster-wrap">
    <img
      class="modal-poster-img"
      src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
      alt="poster ${movie.title}"
    />
  </div>
  <div class="modal-movie-description">
    <h2 class="modal-movie-title">${movie.title}</h2>
    <ul class="modal-movie-descrn-list">
      <li class="modal-movie-descrp-item">
        <p class="descrp-title">Vote / Votes</p>
        <p class="descrp-text">
          <span>${movie.vote_average.toFixed(1)}</span> <span>/</span> <span>${
    movie.vote_count
  }</span>
        </p>
      </li>
      <li class="modal-movie-descrp-item">
        <p class="descrp-title">Popularity</p>
        <p class="descrp-text">${movie.popularity.toFixed(1)}</p>
      </li>
      <li class="modal-movie-descrp-item">
        <p class="descrp-title">Original Title</p>
        <p class="descrp-text">${movie.original_title}</p>
      </li>
      <li class="modal-movie-descrp-item">
        <p class="descrp-title">Genre</p>
        <p class="descrp-text">${movie.genres.map(el => el.name).join(', ')}</p>
      </li>
    </ul>
    <p class="modal-movie-about-title">About</p>
    <p class="modal-movie-about-text">
      ${movie.overview}
    </p>
    <div class="modal-btn">
      <button class="btn btn-watched btn-add-to" type="button" data-action="watched" id="add-to-watched">add to Watched</button>
      <button class="btn btn-queue btn-add-to" type="button" data-action="queue" id="add-to-queue">add to Queue</button>
    </div>
  </div>`;
}

// рендерит разметку
export function renderMovieGallery(element, markup) {
  element.insertAdjacentHTML('beforeend', markup);
}

// возвращает id фильма по клику на карточу
export function getMovieId(evt) {
  if (evt.target.nodeName === 'UL') {
    return;
  }

  return Number(evt.target.closest('#movie-item').dataset.id);
}

// функция делает плавный скролл
export function addSmoothScroling(element) {
  const { height: cardHeight } =
    element.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

// функция скрывает кнопку LoadMore
export function removesBtnLoadMore(element, data) {
  if (data.page === data.total_pages) {
    element.classList.add('visually-hidden');
  } else {
    element.classList.remove('visually-hidden');
  }
}

// функция добавляяет в Local Storage
export function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error.message);
  }
}

// функция читает из Local Storage
export function loadFromLocalStorage(key) {
  try {
    return null ? undefined : JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.error(error.message);
  }
}

// содает пустой массив в Local Storage, если такой отсутствует
export function createArrayLocalStorage(key) {
  if (localStorage.getItem(key) === null) {
    localStorage.setItem(key, '[]');
  }
}
// Удаляет пустой массив в LocalStorage, если он пуст
export function removeLocalStorage(key) {
  if (localStorage.getItem(key) === '[]') {
    localStorage.removeItem(key);
  }
}

export function addAccentColor(btn) {
  btn.classList.toggle('btn-active');
}
