import express from "express";
import { getAvailableSeats, getGenre, getMovieDetail, getMovies } from "../../controllers/GlobalController";

const globalRoutes = express.Router();

globalRoutes.get('/movies', getMovies)
globalRoutes.get("/genres", getGenre)
globalRoutes.get("/movies/:id", getMovieDetail)
globalRoutes.get("/check-seats/:movieId", getAvailableSeats)

export default globalRoutes