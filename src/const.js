const KIND_OF_POINTS = ['taxi', 'bus', 'train', 'ship', 'drive','flight','check-in', 'sightseeing', 'restaurant'];


const DESCRIPTION = ['Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet numquam suscipit expedita eos incidunt quibusdam, eius temporibus. Fugit veritatis suscipit eius voluptatem voluptates rerum quidem fugiat harum ad, optio itaque?',
  'Facere voluptas ipsum dolorum accusamus cum, id facilis, saepe eaque qui praesentium excepturi commodi! Perspiciatis a minus quidem iusto corporis., Est eius omnis suscipit, ad at quo officia iure rerum.',
  'Eum culpa modi dolor officia dicta a libero perferendis maxime quam soluta earum impedit rem, provident autem, laboriosam vitae beatae in similique nesciunt? At quasi eaque animi error similique accusamus?',
  'Repudiandae praesentium exercitationem iste beatae libero voluptatem magni fugiat animi molestiae perspiciatis quis ex officiis, aspernatur assumenda repellat veniam odit sit illo sequi aut! Ipsa officiis eveniet aliquid ex incidunt!',
  'Sequi, eius cum nihil sed placeat ut pariatur quam iure consectetur consequuntur delectus deleniti quis deserunt praesentium saepe obcaecati itaque odit ullam! Illum ex dolorum voluptatibus a, esse perspiciatis rerum?'];
const CITIES = ['London','Paris','Rome','Berlin','Madrid'];
const getDefaultEvent = () => ({
  id: '',
  basePrice: 0,
  dateFrom: new Date().toString(),
  dateTo: new Date().toString(),
  destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e05',//? с null выдает ошибку
  isFavorite: false,
  offers: [],
  type: KIND_OF_POINTS[0]
});


export const Mode = {
  DEFAULT: 'DEFAULT',
  EDIT: 'EDIT'
};


export const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS:'offers'
};


export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

export const FilterTypeMessage = {
  EVERYTHING: 'Click New Event to create your first point',
  FUTURE: 'There are no future events now',
  PRESENT: 'There are no present events now',
  PAST: 'There are no past events now'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

export {KIND_OF_POINTS,DESCRIPTION,CITIES,getDefaultEvent,UpdateType,UserAction};
//dayjs(taskB.dueDate).diff(dayjs(taskA.dueDate))
