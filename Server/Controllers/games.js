"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteGames = exports.UpdateGames = exports.AddGames = exports.DisplayGamesByID = exports.DisplayGamesList = exports.ProcessLogout = exports.ProcessLogin = exports.ProcessRegistration = void 0;
const passport_1 = __importDefault(require("passport"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("../Models/user"));
const games_1 = __importDefault(require("../Models/games"));
const index_1 = require("../Util/index");
function SanitizeArray(unsanitizedValue) {
    if (Array.isArray(unsanitizedValue)) {
        return unsanitizedValue.map((value) => value.trim());
    }
    else if (typeof unsanitizedValue === "string") {
        return unsanitizedValue.split(",").map((value) => value.trim());
    }
    else {
        return [];
    }
}
function ProcessRegistration(req, res, next) {
    let newUser = new user_1.default({
        username: req.body.username,
        emailAddress: req.body.EmailAddress,
        displayName: req.body.FirstName + " " + req.body.LastName
    });
    user_1.default.register(newUser, req.body.password, (err) => {
        if (err instanceof mongoose_1.default.Error.ValidationError) {
            console.error('All Fields Are Required');
            return res.json({ success: false, msg: 'ERROR: User Not Registered. All Fields Are Required' });
        }
        if (err) {
            console.error('Error: Inserting New User');
            if (err.name == "UserExistsError") {
                console.error('Error: User Already Exists');
            }
            return res.json({ success: false, msg: 'User not Registered Successfully!' });
        }
        return res.json({ success: true, msg: 'User Registered Successfully!' });
    });
}
exports.ProcessRegistration = ProcessRegistration;
function ProcessLogin(req, res, next) {
    passport_1.default.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (!user) {
            return res.json({ success: false, msg: 'ERROR: User Not Logged in.' });
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error(err);
                res.end(err);
            }
            const authToken = (0, index_1.GenerateToken)(user);
            return res.json({ success: true, msg: 'User Logged In Successfully!', user: {
                    id: user._id,
                    displayName: user.displayName,
                    username: user.username,
                    emailAddress: user.emailAddress
                }, token: authToken });
        });
        return;
    })(req, res, next);
}
exports.ProcessLogin = ProcessLogin;
function ProcessLogout(req, res, next) {
    req.logout(() => {
        console.log("User Logged Out");
    });
    res.json({ success: true, msg: 'User Logged out Successfully!' });
}
exports.ProcessLogout = ProcessLogout;
function DisplayGamesList(req, res, next) {
    games_1.default.find({})
        .then(function (data) {
        res.status(200).json({ success: true, msg: "Game List Displayed Successfully", data: data });
    })
        .catch(function (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "ERROR: Something Went Wrong", data: null });
    });
}
exports.DisplayGamesList = DisplayGamesList;
function DisplayGamesByID(req, res, next) {
    try {
        let id = req.params.id;
        games_1.default.findById({ _id: id })
            .then(function (data) {
            if (data) {
                res.status(200).json({ success: true, msg: "Games Retrieved by ID Successfully", data: data });
            }
            else {
                res.status(404).json({ success: false, msg: "Games ID Not Found", data: data });
            }
        })
            .catch(function (err) {
            console.error(err);
            res.status(400).json({ success: false, msg: "ERROR: Game ID not formatted correctly", data: null });
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "ERROR: Something Went Wrong", data: null });
    }
}
exports.DisplayGamesByID = DisplayGamesByID;
function AddGames(req, res, next) {
    try {
        let genres = SanitizeArray(req.body.genres);
        let platforms = SanitizeArray(req.body.platforms);
        let modes = SanitizeArray(req.body.modes);
        let games = new games_1.default({
            ID: req.body.ID,
            title: req.body.title,
            releaseDate: req.body.releaseDate,
            genres: genres,
            platforms: platforms,
            modes: modes,
            developers: req.body.developers,
            designers: req.body.designers,
            publishers: req.body.publishers,
            description: req.body.description,
            ImageURL: req.body.ImageURL,
            artists: req.body.artists,
            rating: req.body.rating
        });
        games_1.default.create(games)
            .then(function () {
            res.status(200).json({ success: true, msg: "Game Added Successfully", data: games });
        })
            .catch(function (err) {
            console.error(err);
            if (err instanceof mongoose_1.default.Error.ValidationError) {
                res.status(400).json({ success: false, msg: "ERROR: Game Not Added. All Fields are required", data: null });
            }
            else {
                res.status(400).json({ success: false, msg: "ERROR: Game Not Added.", data: null });
            }
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "Something Went Wrong", data: null });
    }
}
exports.AddGames = AddGames;
function UpdateGames(req, res, next) {
    try {
        let id = req.params.id;
        let genres = SanitizeArray(req.body.genres);
        let platforms = SanitizeArray(req.body.platforms);
        let modes = SanitizeArray(req.body.modes);
        let gamesToUpdate = new games_1.default({
            _id: id,
            ID: req.body.ID,
            title: req.body.title,
            releaseDate: req.body.releaseDate,
            genres: genres,
            platforms: platforms,
            modes: modes,
            developers: req.body.developers,
            designers: req.body.designers,
            publishers: req.body.publishers,
            description: req.body.description,
            ImageURL: req.body.ImageURL,
            artists: req.body.artists,
            rating: req.body.rating
        });
        games_1.default.updateOne({ _id: id }, gamesToUpdate)
            .then(function () {
            res.status(200).json({ success: true, msg: "Game Updated Successfully", data: gamesToUpdate });
        })
            .catch(function (err) {
            console.error(err);
            if (err instanceof mongoose_1.default.Error.ValidationError) {
                res.status(400).json({ success: false, msg: "ERROR: Game Not Updated. All Fields are required", data: null });
            }
            else {
                res.status(400).json({ success: false, msg: "ERROR: Game Not Updated.", data: null });
            }
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "Something Went Wrong", data: null });
    }
}
exports.UpdateGames = UpdateGames;
function DeleteGames(req, res, next) {
    try {
        let id = req.params.id;
        games_1.default.deleteOne({ _id: id })
            .then(function () {
            res.status(200).json({ success: true, msg: "Game Deleted Successfully", data: id });
        })
            .catch(function (err) {
            console.error(err);
            res.status(400).json({ success: false, msg: "ERROR: Game ID not formatted correctly", data: null });
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "ERROR: Something Went Wrong", data: null });
    }
}
exports.DeleteGames = DeleteGames;
//# sourceMappingURL=games.js.map