import express from "express";
import { getAvailableSeats, getGenre, getMovieDetail, getMovies, getMoviesFilter } from "../../controllers/GlobalController";
import { validateRequest } from "../../middlewares/validateRequest";
import { transactionSchema } from "../../utils/zodSchema";
import { getOrderDetail, getOrders, transactionTicket } from "../../controllers/TicketController";

const globalRoutes = express.Router();

globalRoutes.get('/movies', getMovies)
globalRoutes.get("/genres", getGenre)
globalRoutes.get("/movies/:id", getMovieDetail)
globalRoutes.get("/check-seats/:movieId", getAvailableSeats)
globalRoutes.get("/browse-movies/:genreId", getMoviesFilter)
globalRoutes.post("/transaction/buy", validateRequest(transactionSchema), transactionTicket)
globalRoutes.get("/orders", getOrders)
globalRoutes.get("/orders/:id", getOrderDetail)

export default globalRoutes