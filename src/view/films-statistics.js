import {createElement} from '../utils.js';

const createFilmsStatisticsTemplate = (totalFilms) => `<p>${totalFilms} movies inside</p>`;

export default class FilmsStatistics {
  constructor(totalFilms) {
    this._totalFilms = totalFilms;
    this._element = null;
  }

  getTemplate() {
    return createFilmsStatisticsTemplate(this._totalFilms);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
