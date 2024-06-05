import AbstractView from '../framework/view/abstract-view';

function createEvent() {


  return `   <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" disabled>New event</button>
  `;
}

export default class AddEventView extends AbstractView{


  constructor() {
    super();
  }

  get template() {
    return createEvent();
  }
}

