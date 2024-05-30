import { KIND_OF_POINTS, getDefaultEvent } from '../const';
import { humanizeDueTimeForForm } from '../util.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const editEventFormTemplate = (event,destinations,offers) => {
  const {type,dateFrom,dateTo,basePrice} = event;
  const currentDestination = destinations.find((destination) => destination.id === event.destination);
  const {name, description, pictures} = currentDestination;
  const typeOffers = offers.find((offer) => offer.type === event.type).offers;
  const eventOffers = typeOffers.filter((typeOffer) => event.offers.includes(typeOffer.id));
  return `  <li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
<header class="event__header">
  <div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
${KIND_OF_POINTS.map((pointType) => (`<div class="event__type-item">
          <input id="event-type-${pointType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}" ${pointType === type ? 'checked' : ''}>
          <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-1">${pointType}</label>
        </div>`
  )).join('')}

      </fieldset>
    </div>
  </div>

  <div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
    ${type}
    </label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name || ''}" list="destination-list-1">
    <datalist id="destination-list-1">
      ${destinations.map((destination) => `<option value="${destination.name}"></option>)`).join('')}
    </datalist>
  </div>

  <div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeDueTimeForForm(dateFrom)}">
    &mdash;
    <label class="visually-hidden" for="event-end-time-1">To</label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeDueTimeForForm(dateTo)}">
  </div>

  <div class="event__field-group  event__field-group--price">
    <label class="event__label" for="event-price-1">
      <span class="visually-hidden">Price</span>
      &euro;
    </label>
    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
  </div>

  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
  <button class="event__reset-btn" type="reset">${event.id ? 'Delete' : 'Cancel'}</button>
  ${event.id ? ` <button class="event__rollup-btn" type="button">
  <span class="visually-hidden">Open event</span>
</button>` : ''}
</header>
<section class="event__details">

${typeOffers.length ? `
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
${typeOffers.map((typeOffer) => ` <div class="event__available-offers">
<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-${typeOffer.title}-1" type="checkbox" name="event-${typeOffer.title}" ${eventOffers.map((offer) => offer.id).includes(typeOffer.id) ? 'checked' : ''}>
  <label class="event__offer-label" for="event-${typeOffer.title}-1">
    <span class="event__offer-title">${typeOffer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${typeOffer.price}</span>
  </label>
</div>`).join('')}

  </section>` : ''}
${currentDestination ? (`<section class="event__section  event__section--destination">
<h3 class="event__section-title  event__section-title--destination">Destination</h3>
<p class="event__destination-description">${description}</p>

<div class="event__photos-container">
  <div class="event__photos-tape">
  ${pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="Event photo"></img>`).join('')}
  </div>
</div>
</section>
</section>`) : ''}

</form>
</li>`;
};
export default class EditingForm extends AbstractStatefulView {
  #event = null;
  #destinations = null;
  #offers = null;
  #typeOffers = null;
  #onClick = null;
  #onSubmit = null;
  #datepicker = null;

  constructor({event = getDefaultEvent(), destinations,offers, onSubmit, onClick}) {
    super();
    this.#event = event;
    this._setState(EditingForm.parseEventToState(event));
    this.#destinations = destinations;
    this.#offers = offers;
    // this.#typeOffers = this.#getOffersByType(event.type);
    this.#onSubmit = onSubmit;
    this.#onClick = onClick;
    this._restoreHandlers();

  }

  #onSubmitClick = (evt) => {
    evt.preventDefault();
    this.#onSubmit();
  };

  #onCloseBtnClick = (evt) => {
    evt.preventDefault();
    this.reset();
    this.#onClick();
  };

  #onEventTypeClick = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value
    });
  };

  #onEventDestinationClick = (evt) => {
    evt.preventDefault();
    const destination = this.#destinations.find((element) => element.name === evt.target.value);
    this.updateElement({
      destination: destination.id
    });
  };

  #onDateFromChangeClick = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #onDateToChangeClick = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  get template() {
    return editEventFormTemplate(this._state,this.#destinations, this.#offers);
  }

  _restoreHandlers() {
    this.element.addEventListener('submit', this.#onSubmitClick);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onCloseBtnClick);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#onEventTypeClick);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#onEventDestinationClick);
    this.#setDatepickerStart();
    this.#setDatepickerEnd();
  }

  removeElement() {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  }

  reset() {
    this.updateElement(this.#event);
  }

  #setDatepickerStart() {
    this.#datepicker = flatpickr(
      this.element.querySelector('[name="event-start-time"]'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        minDate: 'today',
        'time_24hr': true,
        defaultDate: this._state.dateFrom,
        onChange: this.#onDateFromChangeClick, // На событие flatpickr передаём наш колбэк
      },
    );
  }

  #setDatepickerEnd() {
    this.#datepicker = flatpickr(
      this.element.querySelector('[name="event-end-time"]'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        minDate: this._state.dateFrom,
        'time_24hr': true,
        defaultDate: this._state.dateTo,
        onChange: this.#onDateToChangeClick, // На событие flatpickr передаём наш колбэк
      },
    );
  }

  static parseEventToState(event) {
    return {...event};
  }

  static parseStateToEvent(state) {
    return {...state};
  }
}
