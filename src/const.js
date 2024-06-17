const KIND_OF_POINTS = ['taxi', 'bus', 'train', 'ship', 'drive','flight','check-in', 'sightseeing', 'restaurant'];

const DEFAULT_EVENT = {
  type: 'flight',
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  isFavorite: false,
  offers: []
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDIT: 'EDIT'
};


const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS:'offers'
};


const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const FilterTypeMessage = {
  EVERYTHING: 'Click New Event to create your first point',
  FUTURE: 'There are no future events now',
  PRESENT: 'There are no present events now',
  PAST: 'There are no past events now'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  ERROR: 'ERROR'
};

const LoadingMessage = {
  LOADING: 'Loading...',
  SERVER_ERROR: 'Failed to load latest route information'
};

const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const AUTHORIZATION = 'Basic hS6sfS57zcl7sa8j';
const END_POINT = 'https://23.objects.htmlacademy.pro/big-trip';

export {KIND_OF_POINTS,DEFAULT_EVENT ,UpdateType,UserAction,AUTHORIZATION,END_POINT,TimeLimit, Mode,SortType,FilterType,FilterTypeMessage,LoadingMessage};
