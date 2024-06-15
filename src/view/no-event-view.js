import { FilterTypeMessage } from '../const';
import AbstractView from '../framework/view/abstract-view.js';

const createNoEventTemplate = (filterType, failedMessage) => {
  const noTaskTextValue = failedMessage || FilterTypeMessage[filterType];
  return `<p class="trip-events__msg">${noTaskTextValue}</p>`;
};

export default class NoEventView extends AbstractView{
  #filterType = null;
  #failedMessage = null;

  constructor(filterType, failedMessage = null){
    super();
    this.#filterType = filterType;
    this.#failedMessage = failedMessage;
  }

  get template() {
    return createNoEventTemplate(this.#filterType, this.#failedMessage);
  }
}
