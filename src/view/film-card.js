import dayjs from 'dayjs';
import AbstractView from './abstract.js';

const createFilmCardTemplate = (film) => {
  const {title, totalRating, releaseDate, duration, genre, poster, description, comments, watchlist, isWatched, isFavorite} = film;

  const date = dayjs(releaseDate).format('YYYY');

  const renderDescription = (descriptionText) => {
    const maxLength = 139;

    if (descriptionText.length <= maxLength) {
      return descriptionText;
    }

    descriptionText = descriptionText.slice(0, maxLength).trim();
    descriptionText += '...';

    return descriptionText;
  };

  const activeClassName = (status) => {
    if (status === true) {
      return 'film-card__controls-item--active';
    } else {
      return '';
    }
  };

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${date}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${genre[0]}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster"">
    <p class="film-card__description">${renderDescription(description)}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${activeClassName(watchlist)}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${activeClassName(isWatched)}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${activeClassName(isFavorite)}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;

    this._clickHandler = this._clickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._watchlistClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._watchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._favoriteClickHandler);
  }

  setPosterClickHandler(callback) {
    this._callback.click = callback;

    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._clickHandler);
  }

  setTitleClickHandler(callback) {
    this._callback.click = callback;

    this.getElement().querySelector('.film-card__title').addEventListener('click', this._clickHandler);
  }

  setCommentsClickHandler(callback) {
    this._callback.click = callback;

    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._clickHandler);
  }
}
