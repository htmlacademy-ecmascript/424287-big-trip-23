import AbstractView from '../framework/view/abstract-view';

function createEvent() {


  return `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
  `;
}

export default class NewEventButtonView extends AbstractView{
  #onClick = null;

  constructor({onClick}) {
    super();
    this.#onClick = onClick;
    this.element.addEventListener('click', this.#onNewEventBtnClick);

  }

  get template() {
    return createEvent();
  }

  #onNewEventBtnClick = (evt) => {
    evt.preventDefault();
    this.#onClick();
  };
}

