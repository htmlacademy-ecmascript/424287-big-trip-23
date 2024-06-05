import { FilterTypeMessage } from '../const';
import AbstractView from '../framework/view/abstract-view';

function createNoEventTemplate(filterType) {
  const noTaskTextValue = FilterTypeMessage[filterType];

  return `<p class="trip-events__msg">${noTaskTextValue}</p>`;
}

export default class NoEventView extends AbstractView{
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoEventTemplate(this.#filterType);
  }
}

