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

// рендерит разметку
export function renderMovieGallery(element, markup) {
  element.insertAdjacentHTML('beforeend', markup);
}

// возвращает id фильма по клику на карточу
export function getMovieId(evt) {
  if (evt.target.nodeName === 'UL') {
    return;
  }

  return evt.target.closest('#movie-item').dataset.id;
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
