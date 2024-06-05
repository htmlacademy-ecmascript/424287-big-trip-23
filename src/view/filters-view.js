import AbstractView from '../framework/view/abstract-view';
import { FilterType } from '../const';


const PREFIX_FILTER = 'filter-';


const createFilterTemplate = (currentFilterType) =>
  `<form class="trip-filters" action="#" method="get">
     <div class="trip-filters__filter">
     ${Object.values(FilterType).map((filterType) => (`<input id="filter-${filterType}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterType}" ${filterType === currentFilterType ? 'checked' : ''}>
       <label class="trip-filters__filter-label" for="filter-${filterType}">${filterType}</label>`)).join('')}
     </div>





     <button class="visually-hidden" type="submit">Accept filter</button>
   </form>`;


export default class FiltersView extends AbstractView {
  #currentFilterType = '';
  #handleFilterChange = null;


  constructor({currentFilterType, onFilterChange}) {
    super();
    this.#currentFilterType = currentFilterType || FilterType.EVERYTHING;
    this.#handleFilterChange = onFilterChange;


    this.element.addEventListener('change', this.#onFilterChange);
  }


  get template() {
    return createFilterTemplate(this.#currentFilterType);
  }


  #onFilterChange = (evt) => {
    const filterType = evt.target.id.replace(PREFIX_FILTER, '');
    this.#handleFilterChange(filterType);
  };
}


