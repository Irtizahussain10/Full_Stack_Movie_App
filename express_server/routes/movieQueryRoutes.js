const express = require('express');
const router = express.Router();
const path = require('path');
const moviesController = require('../controllers/movies.controller');

//This route gives information about our APIs.
router.get('/', (req, res) => {
  res.sendFile(path.join('C:/Users/SAAD COMMUNICATION/OneDrive/Desktop/Software Side/WebApps/mflix/express_server', '/index.html'));
});

//This route gives the twenty movies present on the given page number.
router.get('/allMovies/:PageNumber', async (req, res) => {
  if (req.params.PageNumber < 0) {
    res.send([]);
  } else {
    try {
      let response = await moviesController.getMovies(Number(req.params.PageNumber));
      res.send(response);
    } catch (e) {
      console.error(e.stack);
      res.send('Oops! Something went wrong');
    };
  };
});

//This route will give all the movies belonging to a particular cast member
router.get('/searchMoviesByCast/:Actor', async (req, res) => {
  try {
    let response = await moviesController.getMoviesByActor(req.params.Actor);
    res.send(response);
  } catch (e) {
    console.error(e.stack);
    res.send('Oops! Something went wrong');
  };
});

//This route will give all the movies belonging to a particular genre
router.get('/searchMoviesByGenre/:Genre/:Page', async (req, res) => {
  try {
    let response = await moviesController
      .getMoviesByGenre(req.params.Page, req.params.Genre);
    res.send(response);
  } catch (e) {
    console.error(e.stack);
    res.send('Oops! Something went wrong');
  };
});

//This route will give all the movies released in a particular country
router.get('/searchMoviesByCountry/:Country/:Page', async (req, res) => {
  try {
    let response = await moviesController
      .getMoviesByCountry(Number(req.params.Page), req.params.Country);
    res.send(response);
  } catch (e) {
    console.error(e.stack);
    res.send('Oops! Something went wrong');
  };
});

//This route will handle requests related to the movie with a given id
router.get('/searchMoviesById/:id', async (req, res) => {
  try {
    let response = await moviesController.getMoviesByID(req.params.id);
    res.send(response);
  } catch (e) {
    console.error(e.stack);
    res.send('Oops! Something went wrong');
  };
});

module.exports = router;