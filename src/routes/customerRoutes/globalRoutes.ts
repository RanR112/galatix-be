import express from "express";
import { getGenre, getMovies } from "../../controllers/GlobalController";

const globalRoutes = express.Router();

globalRoutes.get('/movies', getMovies)
globalRoutes.get("/genres", getGenre)

export default globalRoutes