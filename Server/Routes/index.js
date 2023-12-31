"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
let router = express_1.default.Router();
const passport_1 = __importDefault(require("passport"));
const games_1 = require("../Controllers/games");
router.get('/list', passport_1.default.authenticate('jwt', { session: false }), (req, res, next) => (0, games_1.DisplayGamesList)(req, res, next));
router.get('/find/:id', passport_1.default.authenticate('jwt', { session: false }), (req, res, next) => (0, games_1.DisplayGamesByID)(req, res, next));
router.post('/add', passport_1.default.authenticate('jwt', { session: false }), (req, res, next) => (0, games_1.AddGames)(req, res, next));
router.put('/update/:id', passport_1.default.authenticate('jwt', { session: false }), (req, res, next) => (0, games_1.UpdateGames)(req, res, next));
router.delete('/delete/:id', passport_1.default.authenticate('jwt', { session: false }), (req, res, next) => (0, games_1.DeleteGames)(req, res, next));
router.post('/register', (req, res, next) => (0, games_1.ProcessRegistration)(req, res, next));
router.post('/login', (req, res, next) => (0, games_1.ProcessLogin)(req, res, next));
router.get('/logout', (req, res, next) => (0, games_1.ProcessLogout)(req, res, next));
exports.default = router;
//# sourceMappingURL=index.js.map