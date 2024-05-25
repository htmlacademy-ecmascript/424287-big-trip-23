import FiltersView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import {RenderPosition} from '../render.js';
import { render, remove } from '../framework/render.js';
import EventPresenter from './event-presenter.js';
import { updateItem, sortEvents } from '../util.js';
import { SortType } from '../const.js';
export default class GeneralPresenter {
  #tripControlsFilters = null;
  #tripEvents = null;
  #pointModel = null;
  #tripEventsView = null;
  #eventListComponent = null;
  #eventPresenters = new Map();
  #events = null;
  #sortView = null;
  #activeSortType = SortType.DAY;
  #filterView = null;
  constructor({tripControlsFilters,tripEvents,pointModel}) {
    this.#tripControlsFilters = tripControlsFilters;
    this.#tripEvents = tripEvents;
    this.#pointModel = pointModel;
    this.#eventListComponent = new EventListView();
  }

  init() {
    this.#events = sortEvents(this.#pointModel.events,this.#activeSortType);
    this.#clearTripEvents();
    this.#filterView = new FiltersView();
    render(this.#filterView,this.#tripControlsFilters,RenderPosition.BEFOREEND);
    this.#sortView = new SortView({currentSortType:this.#activeSortType, onSortChange:this.#handleSortChange});
    render(this.#sortView,this.#tripEvents);
    this.#renderTripEvents(this.#pointModel);

  }

  #clearTripEvents() {
    if(!this.#events.length) {
      console.log('f');
    }
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
    remove(this.#sortView);
    remove(this.#eventListComponent);
    remove(this.#filterView);

  }

  #renderTripEvents({events}) {
    render(this.#eventListComponent,this.#tripEvents);
    events = this.#events;
    events.forEach((event) => this.#renderTripEvent(event));
  }

  #renderTripEvent(event) {
    const destinations = [...this.#pointModel.destinations];
    const offers = [...this.#pointModel.offers];
    const eventPresenter = new EventPresenter({eventListContainer: this.#eventListComponent.element, destinations,offers, onDataChange: this.#onDataChange, onEditStart:this.#resetAllViews});

    eventPresenter.init(event);

    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #onDataChange = (update) => {
    this.#events = updateItem(this.#events, update);
    this.#eventPresenters.get(update.id).init(update);
  };

  #resetAllViews = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortChange = (nextSortType) => {
    this.#activeSortType = nextSortType;
    this.init();
  };

}

