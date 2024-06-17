import AbstractView from '../framework/view/abstract-view';
import { SortType } from '../const';

const DISABLED_SORT_TYPES = [SortType.EVENT, SortType.OFFERS];
const PREFIX_SORT = 'sort-';
const createSortTemplate = (currentSortType) => (
  ` <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
 ${Object.values(SortType).map((sortType) => (`<div class="trip-sort__item  trip-sort__item--${sortType}">
 <input id="sort-${sortType}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortType}" ${sortType === currentSortType ? 'checked' : ''} ${DISABLED_SORT_TYPES.includes(sortType) ? 'disabled' : ''} >
 <label class="trip-sort__btn" for="sort-${sortType}">${sortType}</label>
</div>`)).join('')}
</form>`);

export default class SortView extends AbstractView {
  #currentSortType = '';
  #handleSortChange = null;

  constructor({currentSortType, onSortChange}) {
    super();
    this.#currentSortType = currentSortType || SortType.DAY;
    this.#handleSortChange = onSortChange;
    this.element.addEventListener('change', this.#onSortChange);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #onSortChange = (evt) => {
    const sortType = evt.target.id.replace(PREFIX_SORT, '');
    this.#handleSortChange(sortType);
  };
}
