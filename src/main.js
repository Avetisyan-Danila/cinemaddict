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
import {render, RenderPosition, remove} from './utils/render.js';

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

  filmCardComponent.setPosterClickHandler(() => {
    siteBodyElement.classList.add('hide-overflow');
    document.addEventListener('keydown', onEscKeyDown);

    if (siteBodyElement.querySelector('.film-details') === null) {
      cardToPopup();
    }

    removePopup();
    cardToPopup();
  });

  filmCardComponent.setTitleClickHandler(() => {
    siteBodyElement.classList.add('hide-overflow');
    document.addEventListener('keydown', onEscKeyDown);

    if (siteBodyElement.querySelector('.film-details') === null) {
      cardToPopup();
    }

    removePopup();
    cardToPopup();
  });

  filmCardComponent.setCommentsClickHandler(() => {
    siteBodyElement.classList.add('hide-overflow');
    document.addEventListener('keydown', onEscKeyDown);

    if (siteBodyElement.querySelector('.film-details') === null) {
      cardToPopup();
    }

    removePopup();
    cardToPopup();
  });

  filmDetailsComponent.setCloseClickHandler(() => {
    siteBodyElement.classList.remove('hide-overflow');
    removePopup();
  });

  render(filmsListElement, filmCardComponent, RenderPosition.BEFOREEND);
};

const filmComponent = new FilmsView();
const filmListComponent = new FilmsListView();
const filmListContainerComponent = new FilmsListContainerView();

render(siteHeaderElement, new UserRankView(), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteMenuView(filters), RenderPosition.BEFOREEND);
render(siteMainElement, filmComponent, RenderPosition.BEFOREEND);
render(filmComponent, filmListComponent, RenderPosition.BEFOREEND);

if (films.length === 0) {
  render(filmListComponent, new NoFilmsView(), RenderPosition.BEFOREEND);
} else {
  render(siteMainElement, new FilmsSortView(), RenderPosition.BEFOREEND);
  render(filmListComponent, filmListContainerComponent, RenderPosition.BEFOREEND);

  for (let i = 0; i < Math.min(films.length, FILMS_COUNT_PER_STEP); i++) {
    renderFilm(filmListContainerComponent, films[i]);
  }

  render(filmComponent, new TopRatedFilmsListView(), RenderPosition.BEFOREEND);
  render(filmComponent, new MostCommentedFilmsListView(), RenderPosition.BEFOREEND);

  const filmsExtraContainerElements = filmComponent.getElement().querySelectorAll('.films-list--extra .films-list__container');

  for (let i = 0; i < TOP_RATED_FILMS_COUNT; i++) {
    render(filmsExtraContainerElements[0], new FilmCardView(generateFilm()), RenderPosition.BEFOREEND);
  }

  for (let i = 0; i < MOST_COMMENTED_FILMS_COUNT; i++) {
    render(filmsExtraContainerElements[1], new FilmCardView(generateFilm()), RenderPosition.BEFOREEND);
  }

  if (films.length > FILMS_COUNT_PER_STEP) {
    let renderedFilmsCount = FILMS_COUNT_PER_STEP;
    const showMoreButtonComponent = new ShowMoreButtonView();

    render(filmListComponent, showMoreButtonComponent, RenderPosition.BEFOREEND);

    showMoreButtonComponent.setClickHandler(() => {
      films
        .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
        .forEach((film) => renderFilm(filmListContainerComponent, film));

      renderedFilmsCount += FILMS_COUNT_PER_STEP;

      if (renderedFilmsCount >= films.length) {
        remove(showMoreButtonComponent);
      }
    });
  }
}

const siteFooterStatisticsElement = siteBodyElement.querySelector('.footer__statistics');
render(siteFooterStatisticsElement, new FilmsStatisticsView(TOTAL_FILMS), RenderPosition.BEFOREEND);
