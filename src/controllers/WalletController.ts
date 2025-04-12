import type { Response } from "express";
import Wallet from "../models/Wallet";
import type { CustomRequest } from "../types/Request";

export const getBalance = async (req: CustomRequest, res: Response) => {
    try {
        const wallet = await Wallet.findOne({
            user: req.user?.id
        })

        return res.json({
            status: true,
            message: "Success get data",
            data: {
                balance: wallet?.balance ?? 0
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to get data",
            data: null,
            status: "Failed"
        })
    }
}