import EditingForm from '../view/editing-form.js';
import {remove, render, RenderPosition,replace} from '../framework/render.js';
import { Mode,UpdateType,UserAction,DEFAULT_EVENT } from '../const.js';

export default class NewEventPresenter {
  #event = null;
  #destinations = [];
  #offers = null;
  #eventListContainer = null;
  #tripEventView = null;
  #eventEditView = null;
  #mode = Mode.DEFAULT;
  #onDataChange = null;
  #handleEditStart = null;
  #onNewEventFormClose = null;

  constructor({eventListContainer, destinations,offers,onDataChange, onEditStart, onNewEventFormClose}) {
    this.#destinations = destinations;
    this.#offers = offers;
    this.#eventListContainer = eventListContainer;
    this.#onDataChange = onDataChange;
    this.#handleEditStart = onEditStart;
    this.#onNewEventFormClose = onNewEventFormClose;
  }

  init() {
    this.#event = DEFAULT_EVENT;

    this.#eventEditView = new EditingForm({event:this.#event,destinations:this.#destinations, offers:this.#offers, onSubmit: (newState) => {
      this.#onDataChange(UserAction.ADD_EVENT, UpdateType.MAJOR,newState);
    }, onClick:() => {
      this.#switchToViewMode();
    },onSave:() => {
      this.#onSaveBtnClick();
    }, onReset:this.#onFormClose});


    render(this.#eventEditView, this.#eventListContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#onDocumentKeyDown);

  }

  closeNewEventForm() {
    document.removeEventListener('keydown', this.#onDocumentKeyDown);
    this.#onNewEventFormClose();
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

  setSaving() {
    this.#eventEditView.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#eventEditView.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#eventEditView.shake(resetFormState);
  }

  #onFormClose = () => {
    this.closeNewEventForm();
  };


  #switchToViewMode() {
    replace(this.#tripEventView,this.#eventEditView);
    document.removeEventListener('keydown', this.#onDocumentKeyDown);
    this.#mode = Mode.DEFAULT;
  }

  #onDocumentKeyDown = (evt) => {
    if(evt.key === 'Escape') {
      evt.preventDefault();
      this.closeNewEventForm();
    }
  };

  #onSaveBtnClick() {
    this.#onDataChange(UserAction.UPDATE_EVENT,UpdateType.MINOR,{...this.#event});
  }

}


