import {createSiteMenuTemplate} from './view/site-menu.js';
import {createUserRankTemplate} from './view/user-rank.js';
import {createFilmsListTemplate} from './view/films-list.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createShowMoreButtonTemplate} from './view/show-more-button.js';
import {createTopRatedFilmsListTemplate} from './view/films-list-top-rated.js';
import {createMostCommentedFilmsListTemplate} from './view/films-list-most-commented.js';
import {createFilmDetailsTemplate} from './view/film-details.js';
import {createFilmsStatisticsTemplate} from './view/films-statistics.js';

const FILMS_COUNT = 5;
const TOP_RATED_FILMS_COUNT = 2;
const MOST_COMMENTED_FILMS_COUNT = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

render(siteHeaderElement, createUserRankTemplate(), 'beforeend');
render(siteMainElement, createSiteMenuTemplate(), 'beforeend');
render(siteMainElement, createFilmsListTemplate(), 'beforeend');

const filmsElement = siteMainElement.querySelector('.films');
const filmsListElement = filmsElement.querySelector('.films-list');
const filmsListContainerElement = filmsListElement.querySelector('.films-list__container');

for (let i = 0; i < FILMS_COUNT; i++) {
  render(filmsListContainerElement, createFilmCardTemplate(), 'beforeend');
}

render(filmsListElement, createShowMoreButtonTemplate(), 'beforeend');
render(filmsElement, createTopRatedFilmsListTemplate(), 'beforeend');
render(filmsElement, createMostCommentedFilmsListTemplate(), 'beforeend');

const filmsExtraContainerElements = filmsElement.querySelectorAll('.films-list--extra .films-list__container');

for (let i = 0; i < TOP_RATED_FILMS_COUNT; i++) {
  render(filmsExtraContainerElements[0], createFilmCardTemplate(), 'beforeend');
}

for (let i = 0; i < MOST_COMMENTED_FILMS_COUNT; i++) {
  render(filmsExtraContainerElements[1], createFilmCardTemplate(), 'beforeend');
}

const siteBodyElement = document.querySelector('body');

render(siteBodyElement, createFilmDetailsTemplate(), 'beforeend');

const siteFooterStatisticsElement = siteBodyElement.querySelector('.footer__statistics');

render(siteFooterStatisticsElement, createFilmsStatisticsTemplate(), 'beforeend');
