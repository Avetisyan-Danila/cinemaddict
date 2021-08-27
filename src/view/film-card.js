import dayjs from 'dayjs';
import AbstractView from './abstract.js';

const createFilmCardTemplate = (film) => {
  const {title, totalRating, releaseDate, duration, genre, poster, description, comments} = film;

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
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist film-card__controls-item--active" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched film-card__controls-item--active" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite film-card__controls-item--active" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;

    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
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
