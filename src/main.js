import SiteMenuView from './view/site-menu.js';
import UserRankView from './view/user-rank.js';
import FilmsView from './view/films.js';
import FilmsListView from './view/films-list.js';
import FilmsListContainerView from './view/films-list-container.js';
import FilmsSortView from './view/films-sort.js';
import FilmCardView from './view/film-card.js';
import ShowMoreButtonView from './view/show-more-button.js';
import TopRatedFilmsListView from './view/films-list-top-rated.js';
import MostCommentedFilmsListView from './view/films-list-most-commented.js';
import FilmDetailsView from './view/film-details.js';
import FilmsStatisticsView from './view/films-statistics.js';
import NoFilmsView from './view/no-films.js';
import {generateFilm} from './mock/film.js';
import {generateFilter} from './mock/filter.js';
import {render, RenderPosition} from './utils.js';

const TOTAL_FILMS = `${130} ${291}`;
const FILMS_COUNT = 20;
const FILMS_COUNT_PER_STEP = 5;
const TOP_RATED_FILMS_COUNT = 2;
const MOST_COMMENTED_FILMS_COUNT = 2;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

const renderFilm = (filmsListElement, film) => {
  const filmCardComponent = new FilmCardView(film);
  const filmDetailsComponent = new FilmDetailsView(film);

  const cardToPopup = () => {
    siteBodyElement.appendChild(filmDetailsComponent.getElement());
  };

  const removePopup = () => {
    siteBodyElement.removeChild(siteBodyElement.querySelector('.film-details'));
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      removePopup();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  filmCardComponent.getElement().querySelector('.film-card__poster').addEventListener('click', () => {
    siteBodyElement.classList.add('hide-overflow');
    document.addEventListener('keydown', onEscKeyDown);

    if (siteBodyElement.querySelector('.film-details') === null) {
      cardToPopup();
    }

    removePopup();
    cardToPopup();
  });

  filmCardComponent.getElement().querySelector('.film-card__title').addEventListener('click', () => {
    siteBodyElement.classList.add('hide-overflow');
    document.addEventListener('keydown', onEscKeyDown);

    if (siteBodyElement.querySelector('.film-details') === null) {
      cardToPopup();
    }

    removePopup();
    cardToPopup();
  });

  filmCardComponent.getElement().querySelector('.film-card__comments').addEventListener('click', () => {
    siteBodyElement.classList.add('hide-overflow');
    document.addEventListener('keydown', onEscKeyDown);

    if (siteBodyElement.querySelector('.film-details') === null) {
      cardToPopup();
    }

    removePopup();
    cardToPopup();
  });

  filmDetailsComponent.getElement().querySelector('.film-details__close-btn').addEventListener('click', () => {
    siteBodyElement.classList.remove('hide-overflow');
    removePopup();
  });

  render(filmsListElement, filmCardComponent.getElement(), RenderPosition.BEFOREEND);
};

const filmComponent = new FilmsView();
const filmListComponent = new FilmsListView();
const filmListContainerComponent = new FilmsListContainerView();

render(siteHeaderElement, new UserRankView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteMenuView(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, filmComponent.getElement(), RenderPosition.BEFOREEND);
render(filmComponent.getElement(), filmListComponent.getElement(), RenderPosition.BEFOREEND);

if (films.length === 0) {
  render(filmListComponent.getElement(), new NoFilmsView().getElement(), RenderPosition.BEFOREEND);
} else {
  render(siteMainElement, new FilmsSortView().getElement(), RenderPosition.BEFOREEND);
  render(filmListComponent.getElement(), filmListContainerComponent.getElement(), RenderPosition.BEFOREEND);

  for (let i = 0; i < Math.min(films.length, FILMS_COUNT_PER_STEP); i++) {
    renderFilm(filmListContainerComponent.getElement(), films[i]);
  }

  render(filmComponent.getElement(), new TopRatedFilmsListView().getElement(), RenderPosition.BEFOREEND);
  render(filmComponent.getElement(), new MostCommentedFilmsListView().getElement(), RenderPosition.BEFOREEND);

  const filmsExtraContainerElements = filmComponent.getElement().querySelectorAll('.films-list--extra .films-list__container');

  for (let i = 0; i < TOP_RATED_FILMS_COUNT; i++) {
    render(filmsExtraContainerElements[0], new FilmCardView(generateFilm()).getElement(), RenderPosition.BEFOREEND);
  }

  for (let i = 0; i < MOST_COMMENTED_FILMS_COUNT; i++) {
    render(filmsExtraContainerElements[1], new FilmCardView(generateFilm()).getElement(), RenderPosition.BEFOREEND);
  }

  if (films.length > FILMS_COUNT_PER_STEP) {
    let renderedFilmsCount = FILMS_COUNT_PER_STEP;

    render(filmListComponent.getElement(), new ShowMoreButtonView().getElement(), RenderPosition.BEFOREEND);

    const showMoreButton = filmListComponent.getElement().querySelector('.films-list__show-more');

    showMoreButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      films
        .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
        .forEach((film) => renderFilm(filmListContainerComponent.getElement(), film));

      renderedFilmsCount += FILMS_COUNT_PER_STEP;

      if (renderedFilmsCount >= films.length) {
        showMoreButton.remove();
      }
    });
  }
}

const siteFooterStatisticsElement = siteBodyElement.querySelector('.footer__statistics');
render(siteFooterStatisticsElement, new FilmsStatisticsView(TOTAL_FILMS).getElement(), RenderPosition.BEFOREEND);
