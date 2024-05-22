import WayPoint from '../view/way-point.js';
import EditingForm from '../view/editing-form.js';
import { render, replace} from '../framework/render.js';
import { updateItem } from '../util.js';
import { Mode } from '../const.js';
export default class EventPresenter {
  #event = null;
  #destinations = [];
  #offers = [];
  #eventListContainer = null;
  #handlePointUpdate = null;
  #tripEventView = null;
  #eventEditView = null;
  #mode = Mode.DEFAULT;
  constructor({eventListContainer, destinations,offers,onPointUpdate}) {
    this.#destinations = destinations;
    this.#offers = offers;
    this.#eventListContainer = eventListContainer;
    this.#handlePointUpdate = onPointUpdate;
  }

  init(event) {
    this.#event = event;
    this.#renderTripEvent(this.#event, this.#destinations, this.#offers);
  }

  resetView() {
    if(this.#mode === Mode.EDIT) {
      this.#switchToViewMode();
    }
  }

  #renderTripEvent(event, destinations, offers) {
    const prevEventView = this.#tripEventView;

    this.#tripEventView = new WayPoint({event,destinations, offers, onClick: () => {
      this.#switchToEditMode();
    }, onFavouriteBtnClick: () => {
      const updatePoint = updateItem(event, {isFavorite: !event.isFavorite});
      this.#handlePointUpdate(updatePoint);
    }});

    this.#eventEditView = new EditingForm({event,destinations, offers, onSubmit: () => {
      this.#switchToViewMode();
    }, onClick:this.#switchToViewMode()});


    if(prevEventView === null) {
      render(this.#tripEventView, this.#eventListContainer);
      return;
    }

    replace(this.#tripEventView,prevEventView);

  }

  #switchToEditMode() {
    replace(this.#eventEditView,this.#tripEventView);
    document.addEventListener('keydown', this.#onDocumentKeyDown);
    this.#mode = Mode.EDIT;
  }

  #switchToViewMode() {
    replace(this.#tripEventView,this.#eventEditView);
    this.#mode = Mode.DEFAULT;
  }

  #onDocumentKeyDown = (evt) => {
    if(evt.key === 'Escape') {
      evt.preventDefault();
      this.#switchToViewMode();
    }
  };

}
