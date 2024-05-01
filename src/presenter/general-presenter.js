import FiltersView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';
import WayPoint from '../view/way-point.js';
import EditingForm from '../view/editing-form.js';
import EventListView from '../view/event-list-view.js';
import {RenderPosition, render} from '../render.js';

export default class GeneralPresenter {
  eventListComponent = new EventListView();
  constructor() {
    this.tripControlsFilters = document.querySelector('.trip-controls__filters');
    this.tripEvents = document.querySelector('.trip-events');

  }

  init() {
    render(new FiltersView(),this.tripControlsFilters,RenderPosition.BEFOREEND);
    render(new SortView(),this.tripEvents);
    render(this.eventListComponent,this.tripEvents);
    render(new EditingForm(),this.eventListComponent.getElement());
    for(let i = 0; i < 3; i++) {
      render(new WayPoint(),this.eventListComponent.getElement());
    }
  }
}
