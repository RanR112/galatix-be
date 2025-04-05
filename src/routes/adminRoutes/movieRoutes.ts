import express from "express";
import { getMovies } from "../../controllers/MovieController";

const movieRoutes = express.Router();

movieRoutes.get('/movies', getMovies)

export default movieRoutes