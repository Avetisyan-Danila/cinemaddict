import AbstractView from './abstract.js';

export const createMostCommentedFilmsListTemplate = () => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">Most commented</h2>

    <div class="films-list__container"></div>
  </section>`
);

export default class MostCommentedFilmsList extends AbstractView {
  getTemplate() {
    return createMostCommentedFilmsListTemplate();
  }
}
