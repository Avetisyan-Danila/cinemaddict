import FilmCardView from '../view/film-card.js';
import FilmDetailsView from '../view/film-details.js';
import {render, RenderPosition, remove, replace} from '../utils/render.js';

export default class Film {
  constructor(boardContainer, filmListContainer, changeData) {
    this._boardContainer = boardContainer;
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;

    this._handlePosterClick = this._handlePosterClick.bind(this);
    this._handleTitleClick = this._handleTitleClick.bind(this);
    this._handleCommentsClick = this._handleCommentsClick.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmComponent = this._filmCardComponent;
    const prevFilmDetailsComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmCardView(film);
    this._filmDetailsComponent = new FilmDetailsView(film);

    this._filmCardComponent.setPosterClickHandler(this._handlePosterClick);
    this._filmCardComponent.setTitleClickHandler(this._handleTitleClick);
    this._filmCardComponent.setCommentsClickHandler(this._handleCommentsClick);
    this._filmDetailsComponent.setCloseClickHandler(this._handleCloseClick);

    this._filmCardComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    this._filmDetailsComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmDetailsComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmDetailsComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevFilmComponent === null || prevFilmDetailsComponent === null) {
      render(this._filmListContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmListContainer.getElement().contains(prevFilmComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmComponent);
    }

    if (this._boardContainer.contains(prevFilmDetailsComponent.getElement())) {
      replace(this._filmDetailsComponent, prevFilmDetailsComponent);
    }

    remove(prevFilmComponent);
    remove(prevFilmDetailsComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._filmDetailsComponent);
  }

  _popupCheckHandler () {
    if (this._boardContainer.querySelector('.film-details') === null) {
      this._cardToPopup();
    }

    this._removePopup();
    this._cardToPopup();
  }

  _cardToPopup () {
    document.querySelector('main').appendChild(this._filmDetailsComponent.getElement());

    document.querySelector('body').classList.add('hide-overflow');
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _removePopup () {
    document.querySelector('main').removeChild(document.querySelector('main').querySelector('.film-details'));
    document.removeEventListener('keydown', this._escKeyDownHandler);
    document.querySelector('body').classList.remove('hide-overflow');
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._removePopup();
    }
  }

  _handlePosterClick() {
    this._popupCheckHandler();
  }

  _handleTitleClick() {
    this._popupCheckHandler();
  }

  _handleCommentsClick() {
    this._popupCheckHandler();
  }

  _handleCloseClick() {
    this._removePopup();
  }

  _handleWatchlistClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          watchlist: !this._film.watchlist,
        },
      ),
    );
  }

  _handleWatchedClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isWatched: !this._film.isWatched,
        },
      ),
    );
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isFavorite: !this._film.isFavorite,
        },
      ),
    );
  }
}
