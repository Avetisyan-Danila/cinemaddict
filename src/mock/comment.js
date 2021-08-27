import dayjs from 'dayjs';
import {getRandomInteger} from '../utils/common.js';

const generateText = () => {
  const strings = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.',
  ];

  const randomIndex = getRandomInteger(0, strings.length - 1);

  return strings[randomIndex];
};

const generateEmotion = () => {
  const emotions = ['smile', 'sleeping', 'puke', 'angry'];

  const randomIndex = getRandomInteger(0, emotions.length - 1);

  return emotions[randomIndex];
};

const generateDate = () => {
  const maxDaysGap = 30;
  const daysGap = getRandomInteger(-maxDaysGap, 0);
  return dayjs().add(daysGap, 'day').toDate();
};

const generateAuthor = () => {
  const emotions = ['Rita Adams', 'Lori Parks', 'Joanne George', 'Pamela King', 'Annette Hanson', 'Anna Diaz', 'James Richardson', 'Milton Smith', 'William Foster', 'David Santos'];

  const randomIndex = getRandomInteger(0, emotions.length - 1);

  return emotions[randomIndex];
};

const comments = [
  {
    id: 1,
    author: generateAuthor(),
    emotion: generateEmotion(),
    text: generateText(),
    date: generateDate(),
  },
  {
    id: 2,
    author: generateAuthor(),
    emotion: generateEmotion(),
    text: generateText(),
    date: generateDate(),
  },
  {
    id: 3,
    author: generateAuthor(),
    emotion: generateEmotion(),
    text: generateText(),
    date: generateDate(),
  },
  {
    id: 4,
    author: generateAuthor(),
    emotion: generateEmotion(),
    text: generateText(),
    date: generateDate(),
  },
  {
    id: 5,
    author: generateAuthor(),
    emotion: generateEmotion(),
    text: generateText(),
    date: generateDate(),
  },
];

export const generateComments = () => {
  const filmComments = new Array(comments.length).fill();

  for (let i = 0; i < filmComments.length; i++) {
    const randomIndex = getRandomInteger(0, comments.length - 1);
    filmComments[i] = comments[randomIndex];
  }

  return Array.from(new Set(filmComments));
};
