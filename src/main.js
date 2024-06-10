import GeneralPresenter from './presenter/general-presenter';
import PointsModel from './model/points-model';

const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const newEventBtn = document.querySelector('.trip-main');
const pointModel = new PointsModel();
pointModel.init();
const generalPresenter = new GeneralPresenter({tripControlsFilters:tripControlsFilters,tripEvents:tripEvents,pointModel,newEventBtn:newEventBtn});
generalPresenter.init();
