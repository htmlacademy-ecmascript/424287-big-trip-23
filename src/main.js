import GeneralPresenter from './presenter/general-presenter';
import PointsModel from './model/points-model';

const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const pointModel = new PointsModel();
pointModel.init();
const generalPresenter = new GeneralPresenter({tripControlsFilters:tripControlsFilters,tripEvents:tripEvents,pointModel});
generalPresenter.init();
