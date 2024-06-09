import WayPoint from '../view/way-point.js';
import EditingForm from '../view/editing-form.js';
import { remove, render, replace} from '../framework/render.js';
import { Mode,UpdateType,UserAction } from '../const.js';
export default class EventPresenter {
  #event = null;
  #destinations = [];
  #offers = [];
  #eventListContainer = null;
  #tripEventView = null;
  #eventEditView = null;
  #mode = Mode.DEFAULT;
  #onDataChange = null;
  #handleEditStart = null;

  constructor({eventListContainer, destinations,offers,onDataChange, onEditStart}) {
    this.#destinations = destinations;
    this.#offers = offers;
    this.#eventListContainer = eventListContainer;
    this.#onDataChange = onDataChange;
    this.#handleEditStart = onEditStart;
  }

  init(event) {
    this.#event = event;

    const prevEventView = this.#tripEventView;

    this.#tripEventView = new WayPoint({event,destinations:this.#destinations, offers:this.#offers, onClick: () => {
      this.#switchToEditMode();
    }, onBtnClick: this.#onFavoriteBtnClick});

    this.#eventEditView = new EditingForm({event,destinations:this.#destinations, offers:this.#offers, onSubmit: (newState) => {
      this.#onDataChange(UserAction.UPDATE_EVENT, UpdateType.MINOR,newState);
    }, onClick:() => {
      this.#switchToViewMode();
    },onSave:() => {
      this.#onSaveBtnClick();
    }});


    if(prevEventView === null) {
      render(this.#tripEventView, this.#eventListContainer);
      return;
    }

    replace(this.#tripEventView,prevEventView);


  }

  destroy() {
    remove(this.#tripEventView);
    remove(this.#eventEditView);
    this.#tripEventView = null;
    this.#eventEditView = null;
  }

  resetView() {
    if(this.#mode === Mode.EDIT) {
      this.#switchToViewMode();
    }
  }


  #switchToEditMode() {
    this.#handleEditStart();
    replace(this.#eventEditView,this.#tripEventView);
    document.addEventListener('keydown', this.#onDocumentKeyDown);
    this.#mode = Mode.EDIT;
  }

  #switchToViewMode() {
    replace(this.#tripEventView,this.#eventEditView);
    document.removeEventListener('keydown', this.#onDocumentKeyDown);
    this.#mode = Mode.DEFAULT;
  }

  #onDocumentKeyDown = (evt) => {
    if(evt.key === 'Escape') {
      evt.preventDefault();
      this.#eventEditView.reset();
      this.#switchToViewMode();
    }
  };

  #onSaveBtnClick() {
    this.#onDataChange(UserAction.UPDATE_EVENT,UpdateType.MINOR,{...this.#event});
  }

  #onFavoriteBtnClick = () => {
    this.#onDataChange(UserAction.UPDATE_EVENT,UpdateType.PATCH,{...this.#event, isFavorite: !this.#event.isFavorite});
  };
}
