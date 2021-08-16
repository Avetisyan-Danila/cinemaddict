import {createSiteMenuTemplate} from './view/site-menu.js';
import {createUserRankTemplate} from './view/user-rank.js';
import {createFilmsListTemplate} from './view/films-list.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createShowMoreButtonTemplate} from './view/show-more-button.js';
import {createTopRatedFilmsListTemplate} from './view/films-list-top-rated.js';
import {createMostCommentedFilmsListTemplate} from './view/films-list-most-commented.js';
import {createFilmDetailsTemplate} from './view/film-details.js';
import {createFilmsStatisticsTemplate} from './view/films-statistics.js';
import {generateFilm} from './mock/film.js';
import {generateFilter} from './mock/filter.js';

const TOTAL_FILMS = `${130} ${291}`;
const FILMS_COUNT = 20;
const FILMS_COUNT_PER_STEP = 5;
const TOP_RATED_FILMS_COUNT = 2;
const MOST_COMMENTED_FILMS_COUNT = 2;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

render(siteHeaderElement, createUserRankTemplate(), 'beforeend');
render(siteMainElement, createSiteMenuTemplate(filters), 'beforeend');
render(siteMainElement, createFilmsListTemplate(), 'beforeend');

const filmsElement = siteMainElement.querySelector('.films');
const filmsListElement = filmsElement.querySelector('.films-list');
const filmsListContainerElement = filmsListElement.querySelector('.films-list__container');

for (let i = 0; i < Math.min(films.length, FILMS_COUNT_PER_STEP); i++) {
  render(filmsListContainerElement, createFilmCardTemplate(films[i]), 'beforeend');
}

render(filmsElement, createTopRatedFilmsListTemplate(), 'beforeend');
render(filmsElement, createMostCommentedFilmsListTemplate(), 'beforeend');

const filmsExtraContainerElements = filmsElement.querySelectorAll('.films-list--extra .films-list__container');

for (let i = 0; i < TOP_RATED_FILMS_COUNT; i++) {
  render(filmsExtraContainerElements[0], createFilmCardTemplate(generateFilm()), 'beforeend');
}

for (let i = 0; i < MOST_COMMENTED_FILMS_COUNT; i++) {
  render(filmsExtraContainerElements[1], createFilmCardTemplate(generateFilm()), 'beforeend');
}

const siteBodyElement = document.querySelector('body');

render(siteBodyElement, createFilmDetailsTemplate(films[0]), 'beforeend');

const siteFooterStatisticsElement = siteBodyElement.querySelector('.footer__statistics');

render(siteFooterStatisticsElement, createFilmsStatisticsTemplate(TOTAL_FILMS), 'beforeend');

if (films.length > FILMS_COUNT_PER_STEP) {
  let renderedFilmsCount = FILMS_COUNT_PER_STEP;

  render(filmsListElement, createShowMoreButtonTemplate(), 'beforeend');

  const showMoreButton = filmsListElement.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => render(filmsListContainerElement, createFilmCardTemplate(film), 'beforeend'));

    renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (renderedFilmsCount >= films.length) {
      showMoreButton.remove();
    }
  });
}
