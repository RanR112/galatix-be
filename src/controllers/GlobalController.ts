import type { Request, Response } from "express";
import Movie from "../models/Movie";
import Genre from "../models/Genre";

export const getMovies = async (req: Request, res: Response) => {
    try {
        const data = await Movie.find().select("title thumbnail").populate({
            path: "genre",
            select: "name -_id"
        }).limit(3)

        return res.json({
            data: data,
            message: "Success get data",
            status: "Success"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to get data",
            data: null,
            status: "Failed"
        })
    }
};

export const getGenre = async (req: Request, res: Response) => {
    try {
        const genres = await Genre.find().select("name").limit(3)

        return res.json({
            data: genres,
            message: "Success get data",
            status: "Success"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to get data",
            data: null,
            status: "Failed"
        })
    }
}