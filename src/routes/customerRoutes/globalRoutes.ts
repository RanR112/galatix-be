import express from "express";
import { getGenre, getMovieDetail, getMovies } from "../../controllers/GlobalController";

const globalRoutes = express.Router();

globalRoutes.get('/movies', getMovies)
globalRoutes.get("/genres", getGenre)
globalRoutes.get("/movies/:id", getMovieDetail)

export default globalRoutes