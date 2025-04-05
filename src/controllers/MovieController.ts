import { Request, Response } from "express";
import Moive from "../models/Moive";

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