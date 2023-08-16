"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteGames = exports.UpdateGames = exports.AddGames = exports.DisplayGamesByID = exports.DisplayGamesList = void 0;
const games_1 = __importDefault(require("../Models/games"));
function SanitizeArray(unsanitizedArray) {
    let sanitizedArray = [];
    for (const unsanitizedString of unsanitizedArray) {
        sanitizedArray.push(unsanitizedString.trim());
    }
    return sanitizedArray;
}
function DisplayGamesList(req, res, next) {
    games_1.default.find({})
        .then(function (data) {
        res.status(200).json({ success: true, msg: "Games List Retrieved and Displayed", data: data });
    })
        .catch(function (err) {
        console.error(err);
    });
}
exports.DisplayGamesList = DisplayGamesList;
function DisplayGamesByID(req, res, next) {
    try {
        let id = req.params.id;
        games_1.default.findById({ _id: id })
            .then(function (data) {
            res.status(200).json({ success: true, msg: "Game Retrieved by ID", data: data });
        })
            .catch(function (err) {
            console.error(err);
        });
    }
    catch {
        res.json({ success: false, msg: "No Data to Display" });
    }
}
exports.DisplayGamesByID = DisplayGamesByID;
function AddGames(req, res, next) {
    try {
        let genres = SanitizeArray(req.body.genres.split(","));
        let modes = SanitizeArray(req.body.modes.split(","));
        let platforms = SanitizeArray(req.body.platforms.split(","));
        let games = new games_1.default({
            Id: req.body.Id,
            name: req.body.name,
            title: req.body.title,
            genres: genres,
            platforms: platforms,
            releaseDate: req.body.releaseDate,
            developers: req.body.developers,
            designers: req.body.designers,
            publishers: req.body.publishers,
            rating: req.body.rating,
            description: req.body.description,
            ImageURL: req.body.ImageURL,
            artists: req.body.artists,
            modes: modes
        });
        games_1.default.create(games)
            .then(function () {
            res.status(200).json({ success: true, msg: "Game Added Successfully", data: games });
        })
            .catch(function (err) {
            console.error(err);
        });
    }
    catch {
        res.json({ success: false, msg: "No Data to Add" });
    }
}
exports.AddGames = AddGames;
function UpdateGames(req, res, next) {
    try {
        let id = req.params.id;
        let genres = SanitizeArray(req.body.genres.split(","));
        let modes = SanitizeArray(req.body.modes.split(","));
        let platforms = SanitizeArray(req.body.platforms.split(","));
        let gamesToUpdate = new games_1.default({
            _id: id,
            Id: req.body.Id,
            title: req.body.title,
            genres: genres,
            platforms: platforms,
            releaseDate: req.body.releaseDate,
            developers: req.body.developers,
            designers: req.body.designers,
            publishers: req.body.publishers,
            rating: req.body.rating,
            description: req.body.description,
            ImageURL: req.body.ImageURL,
            artists: req.body.artists,
            modes: modes,
        });
        games_1.default.updateOne({ _id: id }, gamesToUpdate)
            .then(function () {
            res.status(200).json({ success: true, msg: "Games Updated Successfully", data: gamesToUpdate });
        })
            .catch(function (err) {
            console.error(err);
        });
    }
    catch {
        res.json({ success: false, msg: "No Data to Update" });
    }
}
exports.UpdateGames = UpdateGames;
function DeleteGames(req, res, next) {
    try {
        let id = req.params.id;
        games_1.default.deleteOne({ _id: id })
            .then(function () {
            res.json(id);
        })
            .catch(function (err) {
            console.error(err);
        });
    }
    catch {
        res.json({ success: false, msg: "No Data to Delete" });
    }
}
exports.DeleteGames = DeleteGames;
//# sourceMappingURL=games.js.map