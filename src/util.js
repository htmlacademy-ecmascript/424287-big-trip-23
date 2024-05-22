import dayjs from 'dayjs';

const DAY_FORMAT = 'MMM D';
export const TIME_FORMAT = 'HH:mm';
const MACHINE_FORMAT = 'YYYY-MM-DD';
const FORM_FORMAT = 'DD/MM/YY HH:mm';//enum
const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];
const humanizeDueDate = (dueDate) => dueDate ? dayjs(dueDate).format(DAY_FORMAT) : '';
const humanizeDueTime = (dueDate) => dueDate ? dayjs(dueDate).format(TIME_FORMAT) : '';
const machineDueFormat = (dueDate) => dueDate ? dayjs(dueDate).format(MACHINE_FORMAT) : '';
const humanizeDueTimeForForm = (dueDate) => dueDate ? dayjs(dueDate).format(FORM_FORMAT) : '';

const updateData = (items, update) => items.map((item) => item.id === update.id ? update : item);
const updateItem = (item, prop) => ({...item, ...prop});
export {getRandomArrayElement,humanizeDueDate,humanizeDueTime, machineDueFormat,humanizeDueTimeForForm,updateData,updateItem};
