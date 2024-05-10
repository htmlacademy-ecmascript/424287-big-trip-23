import { getRandomArrayElement } from '../util.js';
import { DESCRIPTION } from '../const.js';
import { CITIES } from '../const.js';
export const destinations = [
  {
    id: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e05',
    description: getRandomArrayElement(DESCRIPTION),
    name: getRandomArrayElement(CITIES),
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=1}',
        description: 'Chamonix parliament building'},
      {src: `https://loremflickr.com/248/152?random=${getRandomArrayElement(5)}`,
        description: getRandomArrayElement(DESCRIPTION),
      }
    ]
  },
  {
    id: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e06',
    description: getRandomArrayElement(DESCRIPTION),
    name: getRandomArrayElement(CITIES),
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=2)}',
        description: 'Chamonix parliament building'},
      {src: 'https://loremflickr.com/248/152?random=3}',
        description: getRandomArrayElement(DESCRIPTION),
      }
    ]
  }
];


