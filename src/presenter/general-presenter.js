import FiltersView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import {RenderPosition} from '../render.js';
import { render, remove} from '../framework/render.js';
import EventPresenter from './event-presenter.js';
import { updateItem, sortEvents,filterEvents } from '../util.js';
import { SortType, FilterType,UserAction,UpdateType } from '../const.js';
import NoEventView from '../view/no-event-view.js';
import AddEventButtonView from '../view/add-event-button-view.js';
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
  #activeFilterType = FilterType.EVERYTHING;
  #filterView = null;
  #noEventComponent = null;
  #newEvent = null;

  constructor({tripControlsFilters,tripEvents,pointModel}) {
    this.#tripControlsFilters = tripControlsFilters;
    this.#tripEvents = tripEvents;
    this.#pointModel = pointModel;
    this.#eventListComponent = new EventListView();
    this.#pointModel.addObserver(this.#handleModelEvent);

  }

  init() {
    this.#events = filterEvents(this.#pointModel.events,this.#activeFilterType);
    this.#events = sortEvents(this.#events,this.#activeSortType);
    this.#clearTripEvents();
    this.#filterView = new FiltersView({currentFilterType:this.#activeFilterType, onFilterChange:this.#handleFilterChange});
    render(this.#filterView,this.#tripControlsFilters,RenderPosition.BEFOREEND);
    this.#sortView = new SortView({currentSortType:this.#activeSortType, onSortChange:this.#handleSortChange});
    render(this.#sortView,this.#tripEvents);
    this.#renderTripEvents(this.#pointModel);
    this.#newEvent = new AddEventButtonView({onClick:this.#handleNewEvent});
  }

  #clearTripEvents() {

    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
    remove(this.#sortView);
    remove(this.#eventListComponent);
    remove(this.#filterView);
    if (this.#noEventComponent) {
      remove(this.#noEventComponent);
    }

  }

  #renderTripEvents() {
    if(!this.#events.length) {
      this.#renderNoEvents();
    }
    render(this.#eventListComponent,this.#tripEvents);
    this.#events.forEach((event) => this.#renderTripEvent(event));
  }

  #renderTripEvent(event) {
    const destinations = [...this.#pointModel.destinations];
    const offers = [...this.#pointModel.offers];

    const eventPresenter = new EventPresenter({eventListContainer: this.#eventListComponent.element, destinations,offers, onDataChange: this.#onDataChange, onEditStart:this.#resetAllViews});

    eventPresenter.init(event);

    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #onDataChange = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#pointModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#pointModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#pointModel.deleteEvent(updateType, update);
        break;
    }
    this.#eventPresenters.get(update.id).init(update);

  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTripEvents();
        this.#renderTripEvents();
        break;
      case UpdateType.MAJOR:
        break;
    }
  };

  #resetAllViews = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortChange = (nextSortType) => {
    this.#activeSortType = nextSortType;
    this.init();
  };

  #handleFilterChange = (nextFilterType) => {
    this.#activeFilterType = nextFilterType;
    this.#activeSortType = SortType.DAY;
    this.init();
  };

  #renderNoEvents() {
    this.#noEventComponent = new NoEventView({
      filterType: this.#activeFilterType.toUpperCase()
    });
    render(this.#noEventComponent,this.#eventListComponent.element);
  }

  #handleNewEvent = (evt) => {
    evt.preventDefault();
    console.log(123);
    this.init();

  };

}

