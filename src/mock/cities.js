import { getRandomArrayElement } from '../util.js';
import { DESCRIPTION } from '../const.js';
export const destination = [
  {
    'id': 'bfa5cb75-a1fe-4b77-a83c-0e528e910e05',
    'description': 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    'name': 'Chamonix',
    'pictures': [
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomArrayElement(5)}`,
        'description': 'Chamonix parliament building'},
      {'src': `https://loremflickr.com/248/152?random=${getRandomArrayElement(5)}`,
        'description': getRandomArrayElement(DESCRIPTION),
      }
    ]
  },
  {
    'id': 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
    'description': getRandomArrayElement(DESCRIPTION),
    'name': 'London',
    'pictures': [
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomArrayElement(5)}`,
        'description': 'Chamonix parliament building'},
      {'src': `https://loremflickr.com/248/152?random=${getRandomArrayElement(5)}`,
        'description': getRandomArrayElement(DESCRIPTION),
      }
    ]
  },
  {
    'id': 'bfa5cb75-a1fe-4b77-a83c-0e528e910e06',
    'description': getRandomArrayElement(DESCRIPTION),
    'name': 'Paris',
    'pictures': [
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomArrayElement(5)}`,
        'description': 'Chamonix parliament building'},
      {'src': `https://loremflickr.com/248/152?random=${getRandomArrayElement(5)}`,
        'description': getRandomArrayElement(DESCRIPTION),
      }
    ]
  }
];
const getRandomCity = () =>
  getRandomArrayElement(destination);


export {getRandomCity};
