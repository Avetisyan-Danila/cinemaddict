import SiteMenuView from './view/site-menu.js';
import UserRankView from './view/user-rank.js';
import FilmsStatisticsView from './view/films-statistics.js';
import {generateFilm} from './mock/film.js';
import {generateFilter} from './mock/filter.js';
import FilmsPresenter from './presenter/films.js';
import {render, RenderPosition} from './utils/render.js';

const TOTAL_FILMS = `${130} ${291}`;
const FILMS_COUNT = 20;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

const filmsPresenter = new FilmsPresenter(siteMainElement);

render(siteHeaderElement, new UserRankView(), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteMenuView(filters), RenderPosition.BEFOREEND);
filmsPresenter.init(films);

const siteFooterStatisticsElement = siteBodyElement.querySelector('.footer__statistics');
render(siteFooterStatisticsElement, new FilmsStatisticsView(TOTAL_FILMS), RenderPosition.BEFOREEND);
