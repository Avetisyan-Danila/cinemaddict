import AbstractView from './abstract.js';

const createFilmsTemplate = () => ('<section class="films"></section>');

export default class FilmsList extends AbstractView {
  getTemplate() {
    return createFilmsTemplate();
  }
}
