import { Request, Response } from "express";
import Moive from "../models/Moive";
import { movieSchema } from "../utils/zodSchema";

export const getMovies = async (req: Request, res: Response) => {
    try {
        const movies = await Moive.find().populate({
            path: "genre",
            select: "name"
        }).populate({
            path: "theaters",
            select: "name"
        })

        return res.json({
            data: movies,
            message: "Success get data",
            status: "Success"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Failed to get data",
            data: null,
            status: "Failed"
        })
    }
}

export const createMovie = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Thumbnail is required!",
                data: null,
                status: "failed"
            })
        }

        const parse = movieSchema.safeParse({
            title: req.body.title,
            genre: req.body.genre,
            theaters: req.body.theaters.split(','),
            available: req.body.available === '1' ? true : false,
            description: req.body.description,
            price: Number.parseInt(req.body.price),
            bonus: req.body?.bonus
        })

        if (!parse.success) {
            const errorMessages = parse.error.issues.map((err) => err.message)

            return res.status(400).json({
                message: "Invalid request",
                details: errorMessages,
                status: "failed"
            })
        }

        const movie = new Moive({
            title: parse.data.title,
            genre: parse.data.genre,
            available: parse.data.available,
            theaters: parse.data.theaters,
            thumbnail: req.file?.filename,
            description: parse.data.description,
            price: parse.data.price,
            bonus: parse.data.bonus,
        })

        await movie.save()

        return res.json({
            message: "Success create data",
            data: movie,
            status: "success"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Failed to get data",
            data: null,
            status: "Failed"
        })
    }
}