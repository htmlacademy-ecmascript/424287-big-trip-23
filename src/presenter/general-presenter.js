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
    this.boardPoints = [...this.pointModel.getEvents()];
    this.destination = this.pointModel.getDestination();
    console.log(this.destination);

    render(new FiltersView(),this.tripControlsFilters,RenderPosition.BEFOREEND);
    render(new SortView(),this.tripEvents);
    render(this.eventListComponent,this.tripEvents);
    render(new EditingForm(),this.eventListComponent.getElement());
    for(let i = 0; i < this.boardPoints.length; i++) {
      render(new WayPoint({event: this.boardPoints[i],destinations:this.destination[i]}),this.eventListComponent.getElement());
    }
  }
}
