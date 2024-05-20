import WayPoint from '../view/way-point.js';
import EditingForm from '../view/editing-form.js';
import { render, replace} from '../framework/render.js';

export default class EventPresenter {
  #event = null;
  #destinations = [];
  #offers = [];
  #eventListContainer = null;

  constructor({eventListContainer,event, destinations,offers}) {
    this.#event = event;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#eventListContainer = eventListContainer;
  }

  init() {
    this.#renderTripEvent(this.#event, this.#destinations, this.#offers);
  }

  #renderTripEvent(event, destinations, offers) {

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

    render(tripEventView, this.#eventListContainer);

  }
}
