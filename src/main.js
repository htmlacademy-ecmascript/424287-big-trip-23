import GeneralPresenter from './presenter/general-presenter';
import PointsModel from './model/points-model';
import EventsApiService from './events-api-service.js';
import { AUTHORIZATION,END_POINT } from './const.js';

const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const newEventBtn = document.querySelector('.trip-main');
const pointModel = new PointsModel({eventsApiService: new EventsApiService(END_POINT, AUTHORIZATION)});
pointModel.init();
const generalPresenter = new GeneralPresenter({tripControlsFilters:tripControlsFilters,tripEvents:tripEvents,pointModel,newEventBtn:newEventBtn});
generalPresenter.init();

