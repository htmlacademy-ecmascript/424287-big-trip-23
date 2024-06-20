import dayjs from 'dayjs';
import { SortType, FilterType } from './const';

const DateFormat = {
  DAY_FORMAT: 'MMM D',
  TIME_FORMAT: 'HH:mm',
  MACHINE_FORMAT: 'YYYY-MM-DD',
  FORM_FORMAT: 'DD/MM/YY HH:mm'
} ;

const humanizeDueDate = (dueDate) => dueDate ? dayjs(dueDate).format(DateFormat.DAY_FORMAT) : '';
const humanizeDueTime = (dueDate) => dueDate ? dayjs(dueDate).format(DateFormat.TIME_FORMAT) : '';
const machineDueFormat = (dueDate) => dueDate ? dayjs(dueDate).format(DateFormat.MACHINE_FORMAT) : '';
const humanizeDueTimeForForm = (dueDate) => dueDate ? dayjs(dueDate).format(DateFormat.FORM_FORMAT) : '';

const getTimeDifference = ({dateFrom,dateTo}) => (new Date(dateTo)).getTime() - (new Date(dateFrom)).getTime();
const getTimeDuration = (dateFrom, dateTo) => {
  let minutes = dayjs(dateTo).diff(dayjs(dateFrom), 'minutes') % 60;
  let hours = dayjs(dateTo).diff(dayjs(dateFrom), 'hours') % 24;
  let days = dayjs(dateTo).diff(dayjs(dateFrom), 'days');
  if (days === 0 && hours === 0){
    minutes = String(minutes).padStart(2, '0');
    return `${minutes}M`;
  } else if (days === 0 && hours !== 0) {
    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    return `${hours}H ${minutes}M`;
  }
  days = String(days).padStart(2, '0');
  hours = String(hours).padStart(2, '0');
  minutes = String(minutes).padStart(2, '0');
  return `${days}D ${hours}H ${minutes}M`;
};

const sortEventsBy = {
  [SortType.DAY]: (events) => [...events].sort((a, b) => dayjs(a.dateFrom).diff(dayjs(b.dateFrom))),
  [SortType.TIME]: (events) => [...events].sort((nextEvent, currentEvent) => getTimeDifference(currentEvent) - getTimeDifference(nextEvent)),
  [SortType.PRICE]: (events) => [...events].sort((nextEvent, currentEvent) => currentEvent.basePrice - nextEvent.basePrice),

};
const sortEvents = (events, sortType) => sortEventsBy[sortType](events);

const isFutureEvent = (date) => dayjs().isBefore(dayjs(date));
const isPresentEvent = (dateFrom, dateTo) => dayjs().isAfter(dayjs(dateFrom)) && dayjs().isBefore(dayjs(dateTo));
const isPastEvent = (date) => dayjs().isAfter(dayjs(date));

const filter = {
  [FilterType.EVERYTHING]: (events) => events.sort((a, b) => dayjs(a.dateFrom).diff(dayjs(b.dateFrom))),
  [FilterType.FUTURE]: (events) => events.filter((event) => isFutureEvent(event.dateFrom)),
  [FilterType.PRESENT]: (events) => events.filter((event) => isPresentEvent(event.dateFrom, event.dateTo)),
  [FilterType.PAST]: (events) => events.filter((event) => isPastEvent(event.dateTo)),
};

const filterEvents = (events, filterType) => filter[filterType](events);

const getPositiveNumber = (item) => {
  if (!item) {
    return null;
  }

  const valueInput = parseInt(item, 10);
  if (isNaN(valueInput) || (valueInput <= 0)) {
    return null;
  }

  return valueInput;
};

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export {humanizeDueDate,humanizeDueTime, machineDueFormat,humanizeDueTimeForForm,sortEvents,getTimeDuration,filterEvents,getPositiveNumber,DateFormat,capitalizeFirstLetter};
