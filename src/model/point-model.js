import {getRandomCity} from '../mock/cities.js';
import {getRandomTask} from '../mock/points.js';

const TASK_COUNT = 3;

export default class PointModel {
  tasks = Array.from({length: TASK_COUNT}, getRandomTask);
  destinations = Array.from({length: TASK_COUNT},getRandomCity);

  getEvents() {
    return this.tasks;
  }

  getDestination() {
    return this.destinations;
  }
}
