import FiltersView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import {RenderPosition} from '../render.js';
import { render, remove} from '../framework/render.js';
import EventPresenter from './event-presenter.js';
import { sortEvents,filterEvents } from '../util.js';
import { SortType, FilterType,UserAction,UpdateType, FilterTypeMessage,LoadingMessage } from '../const.js';
import NoEventView from '../view/no-event-view.js';
import NewEventButtonView from '../view/new-event-button-view.js';
import NewEventPresenter from './new-event-presenter.js';
import LoadingView from '../view/loading-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class GeneralPresenter {
  #tripControlsFilters = null;
  #tripEvents = null;
  #pointModel = null;
  #eventListComponent = null;
  #eventPresenters = new Map();
  #events = null;
  #sortView = null;
  #activeSortType = SortType.DAY;
  #activeFilterType = FilterType.EVERYTHING;
  #filterView = null;
  #noEventComponent = null;
  #newEvent = null;
  #newEventBtn = null;
  #newEventPresenter = null;

  #loadingComponent = new LoadingView({message:LoadingMessage.LOADIND});
  #errComponent = null;
  #isLoading = true;
  #isError = false;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({tripControlsFilters,tripEvents,pointModel,newEventBtn}) {
    this.#tripControlsFilters = tripControlsFilters;
    this.#tripEvents = tripEvents;
    this.#pointModel = pointModel;
    this.#eventListComponent = new EventListView();
    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#newEventBtn = newEventBtn;
  }

  init() {
    this.#events = filterEvents(this.#pointModel.events,this.#activeFilterType);
    this.#events = sortEvents(this.#events,this.#activeSortType);
    this.#clearTripEvents();
    this.#renderHeader();
    this.#renderTripEvents(this.#pointModel);
    this.#renderNewEventBtn();
  }

  #renderNewEventBtn() {
    this.#newEvent = new NewEventButtonView({onClick:this.#handleNewEvent});
    render(this.#newEvent, this.#newEventBtn,RenderPosition.BEFOREEND);
  }

  #clearTripEvents() {

    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
    remove(this.#sortView);
    remove(this.#eventListComponent);
    remove(this.#filterView);
    remove(this.#newEvent);
    remove(this.#loadingComponent);
    if (this.#noEventComponent) {
      remove(this.#noEventComponent);
    }

  }

  #renderHeader() {
    this.#filterView = new FiltersView({currentFilterType:this.#activeFilterType, onFilterChange:this.#handleFilterChange});
    render(this.#filterView,this.#tripControlsFilters,RenderPosition.BEFOREEND);
    this.#sortView = new SortView({currentSortType:this.#activeSortType, onSortChange:this.#handleSortChange});
    render(this.#sortView,this.#tripEvents);
  }

  #renderTripEvents() {
    render(this.#eventListComponent,this.#tripEvents);
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.#isError) {
      this.#renderErrMessage();
      return;
    }

    this.#events.forEach((event) => this.#renderTripEvent(event));

    if(!this.#events.length) {
      this.#renderNoEvents(FilterTypeMessage[this.#activeFilterType]);
    }
  }

  #renderTripEvent(event) {
    const destinations = [...this.#pointModel.destinations];
    const offers = [...this.#pointModel.offers];

    const eventPresenter = new EventPresenter({eventListContainer: this.#eventListComponent.element, destinations,offers, onDataChange: this.#onDataChange, onEditStart:this.#resetAllViews});

    eventPresenter.init(event);

    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #onDataChange = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventPresenters.get(update.id).setSaving();
        try {
          await this.#pointModel.updateEvent(updateType, update);
        } catch(err) {
          this.#eventPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_EVENT:
        this.#newEventPresenter.setSaving();
        try {
          await this.#pointModel.addEvent(updateType, update);
        } catch(err) {
          this.#newEventPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_EVENT:
        this.#eventPresenters.get(update.id).setDeleting();
        try {
          await this.#pointModel.deleteEvent(updateType, update);

        } catch(err) {
          this.#eventPresenters.get(update.id).setAborting();
        }
        break;

    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.init();
        break;
      case UpdateType.MAJOR:
        this.#activeSortType = SortType.DAY;
        this.#activeFilterType = FilterType.EVERYTHING;
        this.init();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.init();
        break;
      case UpdateType.ERROR:
        this.#isError = true;
        break;
    }
  };

  #resetAllViews = () => {
    if (this.#newEventPresenter) {
      this.#newEventPresenter.destroy();
      this.#newEvent.element.disabled = false;
    }
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

  #renderNoEvents(message) {
    this.#noEventComponent = new NoEventView({
      filterType: this.#activeFilterType.toUpperCase()},message
    );
    render(this.#noEventComponent,this.#eventListComponent.element);
  }

  #renderErrMessage() {
    this.#errComponent = new LoadingView({message:LoadingMessage.SERVER_ERROR});
    render(this.#errComponent,this.#eventListComponent.element);
  }

  #handleNewEvent = () => {
    this.#handleModelEvent(UpdateType.MAJOR);
    this.#newEvent.element.disabled = true;
    this.#newEventPresenter = new NewEventPresenter({
      destinations: this.#pointModel.destinations,
      offers: this.#pointModel.offers,
      eventListContainer: this.#eventListComponent.element,
      onEditStart: this.#resetAllViews,
      onDataChange: this.#onDataChange,
      onNewEventFormClose: this.#onNewEventFormClose,
    });
    this.#newEventPresenter.init();
    remove(this.#noEventComponent);
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderLoading() {
    render(this.#loadingComponent, this.#eventListComponent.element, RenderPosition.AFTERBEGIN);
    remove(this.#sortView);
  }

  #onNewEventFormClose = () => {
    if (!this.#events.length) {
      this.#renderNoEvents();
    }
    this.#resetAllViews();
  };

}

