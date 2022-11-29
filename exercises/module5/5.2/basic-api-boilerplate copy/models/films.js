const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/films.json');



function readAllFilms(minimumDuration) {
  const films = parse(jsonDbPath);
  if (minimumDuration === undefined) return films;
  const minimumDurationAsNumber = parseInt(minimumDuration, 10);
  if (Number.isNaN(minimumDurationAsNumber) || minimumDurationAsNumber < 0) return undefined;
  const filmsReachingMinimumDuration = films.filter((film) => film.duration >= minimumDuration);
  return filmsReachingMinimumDuration;
}

function readOneFilm(id) {
  const idNumber = parseInt(id, 10);
  const films = parse(jsonDbPath);
  const index = films.findIndex((film) => film.id === idNumber);
  if (index < 0) return undefined;
  return films[index];
}

function createOneFilm(title, link, duration, budget ) {
  const films = parse(jsonDbPath);
  const newFilm = {
    id: getNextId(),
    title,
    duration,
    budget
  }
  films.push(newFilm);
  serialize(jsonDbPath, films)
  return newFilm;
}

function getNextId() {
  const films = parse(jsonDbPath);
  const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
  if (lastItemIndex === undefined) return 1;
  const lastId = films[lastItemIndex]?.id;
  const nextId = lastId + 1;
  return nextId;
}

function deleteOneFilm(id) {
  const id = parseInt(id,10);
  const films = parse(jsonDbPath);
  const index = films.findIndex((film) => film.id === id)
  if(index < 0 ) return undefined;
  deletedFilms = films.splice(index,1);
  deletedFilm = deletedFilms[0];
  serialize(deletedFilm, jsonDbPath);

  return deletedFilm;
}

function updateOneFilm(id, propertiesToUpdate) {
  const idNumber = parseInt(id, 10);
  const films = parse(jsonDbPath);
  const foundIndex = films.findIndex((film) => films.id === idNumber);
  if (foundIndex < 0) return undefined;

  const updatedFilm= { ...films[foundIndex], ...propertiesToUpdate };

  films[foundIndex] = updatedFilm;

  serialize(jsonDbPath, films);

  return updatedFilm;
}

module.exports = {
  readAllFilms,
  readOneFilm,
  createOneFilm,
  deleteOneFilm,
  updateOneFilm,
};
