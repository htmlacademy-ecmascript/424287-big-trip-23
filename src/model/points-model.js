import {destinations} from '../mock/cities.js';
import {events} from '../mock/points.js';
import { offers } from '../mock/offers.js';


export default class PointsModel {

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
}
