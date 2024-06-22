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
      this.#eventEditView.reset(this.#event);
      this.#switchToViewMode();
    },onSave:() => {
      this.#onSaveBtnClick();
    }, onReset:() => {
      this.#onDelete();
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
    document.removeEventListener('keydown', this.#onDocumentKeyDown);
  }

  resetView() {
    if(this.#mode === Mode.EDIT) {
      this.#eventEditView.reset(this.#event);
      this.#switchToViewMode();
    }
  }

  setSaving() {
    if(this.#mode === Mode.EDIT) {
      this.#eventEditView.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if(this.#mode === Mode.EDIT) {
      this.#eventEditView.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#tripEventView.shake();
      return;
    }

    const resetFormState = () => {
      if (this.#mode !== Mode.EDIT) {
        return;
      }

      this.#eventEditView.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#eventEditView.shake(resetFormState);
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

  #onDelete = () => {
    this.#onDataChange(UserAction.DELETE_EVENT, UpdateType.MINOR, {...this.#event});
  };

  #onDocumentKeyDown = (evt) => {
    if(evt.key === 'Escape') {
      evt.preventDefault();
      this.#eventEditView.reset(this.#event);
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
