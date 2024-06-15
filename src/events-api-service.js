import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

const Route = {
  EVENTS: 'points',
  DESTINATIONS: 'destinations',
  OFFERS: 'offers',
};

export default class EventsApiService extends ApiService {
  get events() {
    return this._load({url: Route.EVENTS})
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({ url: Route.DESTINATIONS }).then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({ url: Route.OFFERS }).then(ApiService.parseResponse);
  }

  async updateEvent(event) {
    const response = await this._load({
      url: `${Route.EVENTS}/${event.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(event)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async addEvent(event) {
    const response = await this._load({
      url: Route.EVENTS,
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(event)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deleteEvent(event) {
    const response = await this._load({
      url: `${Route.EVENTS}/${event.id}`,
      method: Method.DELETE,
    });

    return response;
  }

  #adaptToServer(event) {
    const adaptedEvent = {...event,
      'base_price': Number(event.basePrice),
      'date_from': event.dateFrom instanceof Date ? event.dateFrom.toISOString() : null,
      'date_to': event.dateTo instanceof Date ? event.dateTo.toISOString() : null,
      'is_favorite': event.isFavorite,
    };

    delete adaptedEvent.basePrice;
    delete adaptedEvent.dateFrom;
    delete adaptedEvent.dateTo;
    delete adaptedEvent.isFavorite;

    return adaptedEvent;
  }
}
