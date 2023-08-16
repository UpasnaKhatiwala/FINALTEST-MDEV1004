/*file name - people.ts (Controllers)
Student Name - Upasna Khatiwala
Student id - 200543736
date - August 17th 2023
*/


import { Request, Response, NextFunction } from 'express';

import Games from '../Models/games';

/**

This function sanitizes the array of strings
@param {string[]} unsanitizedArray
@returns {string[]}
*/
function SanitizeArray(unsanitizedArray: string[]): string[] {
let sanitizedArray: string[] = [];
for (const unsanitizedString of unsanitizedArray) {
sanitizedArray.push(unsanitizedString.trim());
}
return sanitizedArray;
}
/* API Functions */

/**

This function displays the Games List
@export
@param {Request} req
@param {Response} res
@param {NextFunction} next
*/
export function DisplayGamesList(req: Request, res: Response, next: NextFunction): void {
// Find all Games in the Games collection
Games.find({})
.then(function (data) {
res.status(200).json({ success: true, msg: "Games List Retrieved and Displayed", data: data });
})
.catch(function (err) {
console.error(err);
});
}
/**

This function displays a single game by the provided ID

@export

@param {Request} req

@param {Response} res

@param {NextFunction} next
*/
export function DisplayGamesByID(req: Request, res: Response, next: NextFunction): void {
try {
// Get the id from the URL
let id = req.params.id;

// Find the Person by id
Games.findById({ _id: id })

    .then(function (data) 
    {
    res.status(200).json({ success: true, msg: "Game Retrieved by ID", data: data })
    })
    .catch(function (err) 
    {
    console.error(err);
    });
}
    catch {
    res.json({ success: false, msg: "No Data to Display" });
    }
}

/**

This function adds a new game to the database

@export

@param {Request} req

@param {Response} res

@param {NextFunction} next
*/
export function AddGames(req: Request, res: Response, next: NextFunction): void {
try {
// Sanitize the array
let genres = SanitizeArray(req.body.genres.split(","));
        let modes = SanitizeArray(req.body.modes.split(","));
        let platforms = SanitizeArray(req.body.platforms.split(","));

// Instantiate a new Person
let games = new Games({
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

// Create a new game and pass it to the database
Games.create(games)
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

/**

This function updates a game in the database by the provided ID

@export

@param {Request} req

@param {Response} res

@param {NextFunction} next
*/
export function UpdateGames(req: Request, res: Response, next: NextFunction): void {
try {

// Get the id from the URL
let id = req.params.id;

// Sanitize the array
let genres = SanitizeArray(req.body.genres.split(","));
        let modes = SanitizeArray(req.body.modes.split(","));
        let platforms = SanitizeArray(req.body.platforms.split(","));

// Instantiate a new Game Object
let gamesToUpdate = new Games({
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

// Find the Game by id and then update
Games.updateOne({ _id: id }, gamesToUpdate)
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

/**

This function removes a game from the database by the provided ID

@export

@param {Request} req

@param {Response} res

@param {NextFunction} next
*/
export function DeleteGames(req: Request, res: Response, next: NextFunction): void {
try {
// Get the id from the URL
let id = req.params.id;

// Find the Person by id and then delete
Games.deleteOne({ _id: id })
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