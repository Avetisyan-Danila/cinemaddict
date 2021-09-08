import dayjs from 'dayjs';

export const sortFilmsByDate = (filmA, filmB) => dayjs(filmB.releaseDate).diff(dayjs(filmA.releaseDate));
export const sortFilmsByRating = (filmA, filmB) => filmB.totalRating - filmA.totalRating;
