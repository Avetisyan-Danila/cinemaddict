import dayjs from 'dayjs';
import {generateComments} from './comment.js';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min;

const generateFilmTitle = () => {
  const titles = [
    'The Dance of Life',
    'Sagebrush Trail',
    'The Man with the Golden Arm',
    'Santa Claus Conquers the Martians',
    'Popeye the Sailor Meets Sindbad the Sailor',
  ];

  const randomIndex = getRandomInteger(0, titles.length - 1);

  return titles[randomIndex];
};

const generateDescription = () => {
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

  const description = new Array(getRandomInteger(1, 5)).fill();

  for (let i = 0; i < description.length; i++) {
    const randomIndex = getRandomInteger(0, strings.length - 1);
    description[i] = strings[randomIndex];
  }

  const descriptionText = description.join(' ');

  return descriptionText;
};

const generatePoster = () => {
  const descriptions = [
    './images/posters/made-for-each-other.png',
    './images/posters/popeye-meets-sinbad.png',
    './images/posters/sagebrush-trail.jpg',
    './images/posters/santa-claus-conquers-the-martians.jpg',
    './images/posters/the-dance-of-life.jpg',
    './images/posters/the-great-flamarion.jpg',
    './images/posters/the-man-with-the-golden-arm.jpg',
  ];

  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

const generateDate = () => {
  const maxDaysGap = 1095;
  const daysGap = getRandomInteger(-maxDaysGap, 0);
  return dayjs().add(daysGap, 'day').toDate();
};

const generateDuration = () => {
  const time = getRandomInteger(15, 180);

  const mins = time % 60;
  const hours = (time - mins) / 60;

  if (hours === 0) {
    return `${mins}m`;
  }

  if (mins === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${mins}m`;
};

const generateGenre = () => {
  const allGenres = [
    'Drama',
    'Film-Noir',
    'Mystery',
    'Comedy',
    'Thriller',
  ];

  const filmGenres = new Array(allGenres.length).fill();

  for (let i = 0; i < filmGenres.length; i++) {
    const randomIndex = getRandomInteger(0, allGenres.length - 1);
    filmGenres[i] = allGenres[randomIndex];
  }

  return Array.from(new Set(filmGenres));
};

const generateDirector = () => {
  const directors = [
    'George Lucas',
    'Steven Spielberg',
    'Christopher Nolan',
    'Ridley Scott',
    'Peter Jackson',
  ];

  const randomIndex = getRandomInteger(0, directors.length - 1);

  return directors[randomIndex];
};

const generateWriters = () => {
  const allWriters = [
    'Asghar Farhadi',
    'Eric Roth',
    'Aaron Sorkin',
    'Woody Allen',
    'Chang-dong Lee',
  ];

  const filmWriters = new Array(allWriters.length).fill();

  for (let i = 0; i < filmWriters.length; i++) {
    const randomIndex = getRandomInteger(0, allWriters.length - 1);
    filmWriters[i] = allWriters[randomIndex];
  }

  return Array.from(new Set(filmWriters));
};

const generateActors = () => {
  const allActors = [
    'Alan Rickman',
    'Benedict Cumberbatch',
    'Benicio del Toro',
    'Vincent Cassel',
    'Viggo Mortensen',
  ];

  const filmActors = new Array(allActors.length).fill();

  for (let i = 0; i < filmActors.length; i++) {
    const randomIndex = getRandomInteger(0, allActors.length - 1);
    filmActors[i] = allActors[randomIndex];
  }

  return Array.from(new Set(filmActors));
};

const generateCountry = () => {
  const countries = [
    'USA',
    'UK',
    'Germany',
    'Italia',
    'Spain',
  ];

  const randomIndex = getRandomInteger(0, countries.length - 1);

  return countries[randomIndex];
};

const generateAgeRating = () => {
  const ageRatings = [
    '0+',
    '6+',
    '12+',
    '16+',
    '18+',
  ];

  const randomIndex = getRandomInteger(0, ageRatings.length - 1);

  return ageRatings[randomIndex];
};

export const generateFilm = () => ({
  title: generateFilmTitle(),
  description: generateDescription(),
  poster: generatePoster(),
  totalRating: getRandomArbitrary(5, 10).toFixed(1),
  releaseDate: generateDate(),
  duration: generateDuration(),
  genre: generateGenre(),
  watchlist: Boolean(getRandomInteger(0, 1)),
  isWatched: Boolean(getRandomInteger(0, 1)),
  isFavorite: Boolean(getRandomInteger(0, 1)),
  comments: generateComments(),
  director: generateDirector(),
  writers: generateWriters(),
  actors: generateActors(),
  country: generateCountry(),
  ageRating: generateAgeRating(),
});
