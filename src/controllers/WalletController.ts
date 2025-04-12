import type { Response } from "express";
import Wallet from "../models/Wallet";
import type { CustomRequest } from "../types/Request";
import WalletTransaction from "../models/WalletTransaction";

export const getBalance = async (req: CustomRequest, res: Response) => {
    try {
        const wallet = await Wallet.findOne({
            user: req.user?.id,
        });

        return res.json({
            status: true,
            message: "Success get data",
            data: {
                balance: wallet?.balance ?? 0,
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to get data",
            data: null,
            status: "Failed",
        });
    }
};

export const getTopupHistory = async (req: CustomRequest, res: Response) => {
    try {
        const wallet = await Wallet.findOne({
            user: req.user?.id,
        });

        const data = await WalletTransaction.find({
            wallet: wallet?._id,
        }).select("wallet price createdAt status");

        return res.json({
            status: true,
            message: "Success get data",
            data: data,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to get data",
            data: null,
            status: "Failed",
        });
    }
};
