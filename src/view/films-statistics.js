import AbstractView from './abstract.js';

const createFilmsStatisticsTemplate = (totalFilms) => `<p>${totalFilms} movies inside</p>`;

export default class FilmsStatistics extends AbstractView {
  constructor(totalFilms) {
    super();
    this._totalFilms = totalFilms;
  }

  getTemplate() {
    return createFilmsStatisticsTemplate(this._totalFilms);
  }
}
