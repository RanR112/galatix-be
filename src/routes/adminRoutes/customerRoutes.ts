import express from "express";
import { getCustomer, getWalletTransactions } from "../../controllers/CustomerController";

const customerRoutes = express.Router();

customerRoutes.get("/customers", getCustomer);
customerRoutes.get("/wallet-transactions", getWalletTransactions);

export default customerRoutes;