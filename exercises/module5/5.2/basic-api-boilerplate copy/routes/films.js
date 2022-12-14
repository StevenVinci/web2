const express = require('express');
const { serialize, parse } = require('../utils/json');
const router = express.Router();
const path = require('node:path');
const jsonDbPath = path.join(__dirname, '/../data/films.json');
const {
  readAllFilms,
  readOneFilm,
  createOneFilm,
  deleteOneFilm,
  updateOneFilm,
} = require('../models/films')


// Read all the films, filtered by minimum-duration if the query param exists
router.get('/', (req, res) => {
  const filmsPotentiallyFiltered = readAllFilms(req?.query?.["minimum-duration"]);
  if(ffilmsPotentiallyFiltered === undefined) return res.sendStatus(400);
  return res.json(filmsPotentiallyFiltered);
});

// Read a film from its id in the menu
router.get('/:id', (req, res) => {
  const film = readOneFilm(req?.params?.id);
  if(!film) return res.sendStatus(400);
  return res.json(film);
});

// Create a film
router.post('/', (req, res) => {
  const title = req?.body?.title?.trim()?.length !== 0 ? req.body.title : undefined;
  const link = req?.body?.content?.trim().length !== 0 ? req.body.link : undefined;
  const duration =
    typeof req?.body?.duration !== 'number' || req.body.duration < 0
      ? undefined
      : req.body.duration;
  const budget =
    typeof req?.body?.budget !== 'number' || req.body.budget < 0 ? undefined : req.body.budget;

  if (!title || !link || !duration || !budget) return res.sendStatus(400);

  const createdFilm = createOneFilm(title, link, duration, budget);

  return res.json(createdFilm);
});

// Delete a film
router.delete('/:id', (req, res) => {
  const deletedFilm = deleteOneFilm(req?.params?.id);
  if (deletedFilm === undefined) return res.sendStatus(404);
  return res.json(deletedFilm);
});

// Update a film identified by its id
router.patch('/:id', (req, res) => {
  const title = req?.body?.title;
  const link = req?.body?.link;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;

  if (
    !req.body ||
    (title && !title.trim()) ||
    (link && !link.trim()) ||
    (duration && (typeof req?.body?.duration !== 'number' || duration < 0)) ||
    (budget && (typeof req?.body?.budget !== 'number' || budget < 0))
  )
    return res.sendStatus(400);

  const updatedFilm = updateOneFilm(req?.params?.id, req?.body);

  if (!updatedFilm) return res.sendStatus(404);

  return res.json(updatedFilm);
});

module.exports = router;