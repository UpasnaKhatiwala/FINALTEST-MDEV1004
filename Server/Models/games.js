"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const gamesSchema = new mongoose_1.Schema({
    Id: Number,
    title: String,
    genres: [String],
    platforms: [String],
    releaseDate: String,
    developers: String,
    designers: String,
    publishers: String,
    rating: String,
    description: String,
    ImageURL: String,
    artists: String,
    modes: String
});
const Games = (0, mongoose_1.model)('Games', gamesSchema);
exports.default = Games;
//# sourceMappingURL=games.js.map