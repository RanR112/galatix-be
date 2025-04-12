import express from 'express';
import { getBalance } from '../../controllers/WalletController';

const walletRoutes = express.Router()

walletRoutes.get("/check-balance", getBalance)

export default walletRoutes