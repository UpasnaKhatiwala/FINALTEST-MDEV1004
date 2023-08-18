/*file name - index.ts
Student Name - Upasna Khatiwala
Student id - 200543736
date - June 23rd 2023
*/


import express from 'express';
let router = express.Router();
import passport from 'passport';

/* GET the movie controller */
import {DisplayGamesList, DisplayGamesByID, AddGames, UpdateGames, DeleteGames, ProcessRegistration, ProcessLogin, ProcessLogout} from '../Controllers/games';

router.get('/list', passport.authenticate('jwt', {session: false}), (req, res, next) =>   DisplayGamesList(req, res, next) );

router.get('/find/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => DisplayGamesByID(req, res, next));

router.post('/add', passport.authenticate('jwt', {session: false}), (req, res, next) => AddGames(req, res, next));

router.put('/update/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => UpdateGames(req, res, next));

router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => DeleteGames(req, res, next));


//Authentication routes
router.post('/register', (req, res, next) => ProcessRegistration(req, res, next));

router.post('/login', (req, res, next) => ProcessLogin(req, res, next));

router.get('/logout', (req, res, next) => ProcessLogout(req, res, next));

export default router;
