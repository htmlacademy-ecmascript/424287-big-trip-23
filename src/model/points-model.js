import Observable from '../framework/observable.js';
import {destinations} from '../mock/cities.js';
import {events} from '../mock/points.js';
import { offers } from '../mock/offers.js';


export default class PointsModel extends Observable {

  #events = [];
  #destinations = [];
  #offers = [];


  init() {
    this.#events = events;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get events() {
    return this.#events;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  updateEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#events = [...this.#events.slice(0, index), update, ...this.#events.slice(index + 1)];
    this._notify(updateType, update);
  }

  addEvent(updateType, update) {
    this.#events = [update, ...this.#events];
    this._notify(updateType, update);
  }

  deleteEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#events = [...this.#events.slice(0, index), ...this.#events.slice(index + 1)];
    this._notify(updateType);
  }
}
