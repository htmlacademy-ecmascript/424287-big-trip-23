import dayjs from 'dayjs';
const date1 = dayjs('2019-07-11T12:22:13.375Z');
date1.diff('2019-07-11T11:22:13.375Z', 'minute');


const DAY_FORMAT = 'MMM D';
const TIME_FORMAT = 'HH:mm';
const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];
const humanizeDueDate = (dueDate) => dueDate ? dayjs(dueDate).format(DAY_FORMAT) : '';
const humanizeDueTime = (dueDate) => dueDate ? dayjs(dueDate).format(TIME_FORMAT) : '';
export {getRandomArrayElement,humanizeDueDate,humanizeDueTime};
