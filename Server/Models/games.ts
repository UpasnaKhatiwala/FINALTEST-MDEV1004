/*file name - games.ts (Models)
Student Name - Upasna Khatiwala
Student id - 200543736
date - June 23rd 2023
*/

import { Schema, model } from 'mongoose';

// Games Interface - defines the structure of a person
interface IGames {
  Id: number;
  title: string;
  genres: string | string[];
  platforms: string | string[];
  releaseDate: string;
  developers: string;
  designers: string;
  publishers: string;
  rating: string;
  description: string;
  ImageURL: string;
  artists: string;
  modes: string | [string];
}

// Person Schema - defines the structure of a person using the Person Interface
const gamesSchema = new Schema<IGames>({
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

const Games = model<IGames>('Games', gamesSchema);

export default Games;
