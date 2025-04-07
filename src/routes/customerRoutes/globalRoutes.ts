import express from "express";
import { getAvailableSeats, getGenre, getMovieDetail, getMovies, getMoviesFilter } from "../../controllers/GlobalController";

const globalRoutes = express.Router();

globalRoutes.get('/movies', getMovies)
globalRoutes.get("/genres", getGenre)
globalRoutes.get("/movies/:id", getMovieDetail)
globalRoutes.get("/check-seats/:movieId", getAvailableSeats)
globalRoutes.get("/browse-movies/:genreId", getMoviesFilter)

export default globalRoutes