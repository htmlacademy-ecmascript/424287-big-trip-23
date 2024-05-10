import GeneralPresenter from './presenter/general-presenter';
import PointModel from './model/point-model';

const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const pointModel = new PointModel();
pointModel.init();
const generalPresenter = new GeneralPresenter({tripControlsFilters:tripControlsFilters,tripEvents:tripEvents,pointModel});
generalPresenter.init();
