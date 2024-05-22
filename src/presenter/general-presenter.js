import FiltersView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import {RenderPosition} from '../render.js';
import { render } from '../framework/render.js';
import EventPresenter from './event-presenter.js';
import { updateData } from '../util.js';

export default class GeneralPresenter {
  #tripControlsFilters = null;
  #tripEvents = null;
  #pointModel = null;
  #tripEventsView = null;
  #eventListComponent = null;
  #eventPresenters = new Map();

  constructor({tripControlsFilters,tripEvents,pointModel}) {
    this.#tripControlsFilters = tripControlsFilters;
    this.#tripEvents = tripEvents;
    this.#pointModel = pointModel;
    this.#eventListComponent = new EventListView();
  }

  init() {
    render(new FiltersView(),this.#tripControlsFilters,RenderPosition.BEFOREEND);
    render(new SortView(),this.#tripEvents);
    this.#renderTripEvents(this.#pointModel);

  }

  #renderTripEvents({events}) {
    render(this.#eventListComponent,this.#tripEvents);
    events.forEach((event) => this.#renderTripEvent(event));
  }

  #renderTripEvent(event) {
    const destinations = [...this.#pointModel.destinations];
    const offers = [...this.#pointModel.offers];
    const eventPresenter = new EventPresenter({eventListContainer: this.#eventListComponent.element, destinations,offers,onPointUpdate: this.#onFavouriteBtnClick});

    eventPresenter.init(event);

    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #onFavouriteBtnClick = (updatedItem) => {
    this.#pointModel = updateData(this.#pointModel, updatedItem);
    this.#eventPresenters.get(updatedItem.id).init(updatedItem);
  };
}

