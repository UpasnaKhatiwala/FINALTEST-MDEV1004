"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const games_1 = require("../Controllers/games");
router.get('/', (req, res, next) => {
    (0, games_1.DisplayGamesList)(req, res, next);
});
router.get('/:id', (req, res, next) => {
    (0, games_1.DisplayGamesByID)(req, res, next);
});
router.post('/', (req, res, next) => {
    (0, games_1.AddGames)(req, res, next);
});
router.put('/:id', (req, res, next) => {
    (0, games_1.UpdateGames)(req, res, next);
});
router.delete('/:id', (req, res, next) => {
    (0, games_1.DeleteGames)(req, res, next);
});
exports.default = router;
//# sourceMappingURL=index.js.map