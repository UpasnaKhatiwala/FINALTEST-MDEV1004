/*file name - index.ts
Student Name - Upasna Khatiwala
Student id - 200543736
date - June 23rd 2023
*/


import express from 'express';
const router = express.Router();

/* Get the game Controller */
import { DisplayGamesList, DisplayGamesByID, AddGames, UpdateGames, DeleteGames } from '../Controllers/games';

/* GET /api/games - display the person list */
router.get('/', (req, res, next) => {
  DisplayGamesList(req, res, next);
});

/* GET /api/games/:id - display a person by id */
router.get('/:id', (req, res, next) => {
  DisplayGamesByID(req, res, next);
});

/* POST /api/people - add a new person */
router.post('/', (req, res, next) => {
  AddGames(req, res, next);
});

/* PUT /api/games/:id - update a person by id */
router.put('/:id', (req, res, next) => {
  UpdateGames(req, res, next);
});

/* DELETE /api/games/:id - delete a person by id */
router.delete('/:id', (req, res, next) => {
  DeleteGames(req, res, next);
});

export default router;
