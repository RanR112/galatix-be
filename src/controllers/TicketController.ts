import type { Response } from "express";
import type { CustomRequest } from "../types/Request";
import { transactionSchema } from "../utils/zodSchema";
import Wallet from "../models/Wallet";
import Transaction from "../models/Transaction";
import TransactionSeat from "../models/TransactionSeat";

export const transactionTicket = async (req: CustomRequest, res: Response) => {
    try {
        const parse = transactionSchema.parse(req.body)

        const wallet = await Wallet.findOne({
            user: req.user?.id
        })

        if (!wallet || (wallet && wallet.balance < parse.total)) {
            return res.status(400).json({
                status: "failed",
                message: "Insufficient balance. please top up your balance first",
                data: null
            })
        }

        const transaction = new Transaction({
            bookingFee: parse.bookingFee,
            total: parse.total,
            subtotal: parse.subtotal,
            theater: parse.theaterId,
            movie: parse.movieId,
            tax: parse.tax,
            user: req.user?.id,
            date: parse.date
        })

        for (const seat of parse.seats) {
            const newSeat = new TransactionSeat({
                transaction: transaction.id,
                seat: seat
            })

            await newSeat.save()
        }

        const transactionSeats = await TransactionSeat.find({
            transaction: transaction.id
        })

        transaction.seats = transactionSeats.map((va) => va._id)

        const currBallance = wallet.balance ?? 0

        await Wallet.findByIdAndUpdate(wallet.id, {
            balance: currBallance - parse.total
        })

        await transaction.save()

        return res.json({
            message: "Success transaction ticket",
            status: "success",
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to transaction ticket",
            data: null,
            status: "Failed",
        });
    }
}

export const getOrders = async (req: CustomRequest, res: Response) => {
    try {
        const transaction = await Transaction.find({
            user: req.user?.id
        }).select("seats movie theater date status").populate({
            path: "movie",
            select: "thumbnail title genre -_id",
            populate: {
                path: "genre",
                select: "name -_id"
            }
        }).populate({
            path: "seats",
            select: "seat -_id"
        }).populate({
            path: "theater",
            select: "name city -_id"
        })

        return res.json({
            status: "success",
            data: transaction,
            message: "Success get data"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to get data",
            data: null,
            status: "Failed",
        });
    }
}

export const getOrderDetail = async (req: CustomRequest, res: Response) => {
    try {
        const {id} =req.params

        const transaction = await Transaction.findById(id).select("seats movie theater date status").populate({
            path: "movie",
            select: "thumbnail title genre -_id",
            populate: {
                path: "genre",
                select: "name -_id"
            }
        }).populate({
            path: "seats",
            select: "seat -_id"
        }).populate({
            path: "theater",
            select: "name city -_id"
        })

        return res.json({
            status: "success",
            data: transaction,
            message: "Success get data"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to get data",
            data: null,
            status: "Failed",
        });
    }
}