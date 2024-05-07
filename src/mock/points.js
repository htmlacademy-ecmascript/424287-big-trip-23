import {KIND_OF_POINTS} from '../const.js';
import { getRandomArrayElement } from '../util.js';
export const destinationInformation = [
  {
    'id': 'f4b62099-293f-4c3d-a702-94eec4a2808c',
    'basePrice': 1100,
    'dateFrom': '2019-07-10T22:55:56.845Z',
    'dateTo': '2019-07-11T11:22:13.375Z',
    'destination': 'bfa5cb75-a1fe-4b77-a83c-0e528e910e05',
    'isFavorite': false,
    'offers': [
      'b4c3e4e6-9053-42ce-b747-e281314baa31'
    ],
    'type': getRandomArrayElement(KIND_OF_POINTS)
  },
  {
    'id': 'f4b62099-293f-4c3d-a702-94eec4a2808c',
    'basePrice': 1000,
    'dateFrom': '2019-07-10T22:55:56.845Z',
    'dateTo': '2019-07-11T11:22:13.375Z',
    'destination': 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
    'isFavorite': true,
    'offers': [
      'b4c3e4e6-9053-42ce-b747-e281314baa31'
    ],
    'type': getRandomArrayElement(KIND_OF_POINTS)
  },
  {
    'id': 'f4b62099-293f-4c3d-a702-94eec4a2808c',
    'basePrice': 1200,
    'dateFrom': '2019-07-10T22:55:56.845Z',
    'dateTo': '2019-07-11T11:22:13.375Z',
    'destination': 'bfa5cb75-a1fe-4b77-a83c-0e528e910e06',
    'isFavorite': false,
    'type': getRandomArrayElement(KIND_OF_POINTS)
  }
];
const getRandomTask = () =>
  getRandomArrayElement(destinationInformation);


export {getRandomTask};
