import {destinations} from '../mock/cities.js';
import {events} from '../mock/points.js';
import { offers } from '../mock/offers.js';


export default class PointsModel {
  constructor() {
    this.events = [];
    this.destinations = [];
    this.offers = [];
  }

  init() {
    this.events = events;
    this.destinations = destinations;
    this.offers = offers;
  }

  getEvents() {
    return this.events;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }
}
