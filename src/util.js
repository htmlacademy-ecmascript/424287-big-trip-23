import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);


const DAY_FORMAT = 'MMM D';
const TIME_FORMAT = 'HH:mm';
const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];
const humanizeDueDate = (dueDate) => dueDate ? dayjs(dueDate).format(DAY_FORMAT) : '';
const humanizeDueTime = (dueDate) => dueDate ? dayjs(dueDate).format(TIME_FORMAT) : '';
export {getRandomArrayElement,humanizeDueDate,humanizeDueTime};
