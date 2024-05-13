import FiltersView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';
import WayPoint from '../view/way-point.js';
import EditingForm from '../view/editing-form.js';
import EventListView from '../view/event-list-view.js';
import {RenderPosition, render} from '../render.js';
export default class GeneralPresenter {
  eventListComponent = new EventListView();
  constructor({tripControlsFilters,tripEvents,pointModel}) {
    this.tripControlsFilters = tripControlsFilters;
    this.tripEvents = tripEvents;
    this.pointModel = pointModel;
  }

  init() {
    const events = [...this.pointModel.getEvents()];
    const destinations = [...this.pointModel.getDestinations()];
    const offers = [...this.pointModel.getOffers()];
    render(new FiltersView(),this.tripControlsFilters,RenderPosition.BEFOREEND);
    render(new SortView(),this.tripEvents);
    render(this.eventListComponent,this.tripEvents);
    // render(new EditingForm({destinations, offers}),this.eventListComponent.getElement());
    render(new EditingForm({event,destinations, offers}),this.eventListComponent.getElement());
    events.forEach((event) => {
      render(new WayPoint({event,destinations, offers}),this.eventListComponent.getElement());
    });
  }
}

