import FiltersView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';
import WayPoint from '../view/way-point.js';
import EditingForm from '../view/editing-form.js';
import EventListView from '../view/event-list-view.js';
import {RenderPosition} from '../render.js';
import { render, replace} from '../framework/render.js';
export default class GeneralPresenter {
  #tripControlsFilters = null;
  #tripEvents = null;
  #pointModel = null;
  #tripEventsView = null;
  #eventListComponent = null;
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
    // this.#renderTripEvent();
    // render(new EditingForm({event,destinations, offers}),this.#eventListComponent.element);
    // render(tripEventView,this.#eventListComponent.element);

  }

  #renderTripEvents({events}) {
    render(this.#eventListComponent,this.#tripEvents);
    events.forEach((event) => this.#renderTripEvent(event));
  }

  #renderTripEvent(event) {
    const destinations = [...this.#pointModel.destinations];
    const offers = [...this.#pointModel.offers];
    const onEditBtnClick = () => switchToEditMode();
    const onCloseBtnClick = () => switchToViewMode();
    const onDocumentKeyDown = (evt) => {
      if(evt.key === 'Escape') {
        evt.preventDefault();
        switchToViewMode();
      }
    };
    const tripEventView = new WayPoint({event,destinations, offers, onClick: onEditBtnClick});

    const eventEditView = new EditingForm({event,destinations, offers, onSubmit: onCloseBtnClick, onClick:onCloseBtnClick});
    function switchToEditMode() {
      replace(eventEditView,tripEventView);
      document.addEventListener('keydown', onDocumentKeyDown);

    }
    function switchToViewMode() {

      replace(tripEventView,eventEditView);
    }
    render(tripEventView, this.#eventListComponent.element);

  }
}

