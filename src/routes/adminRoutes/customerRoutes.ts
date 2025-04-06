import express from "express";
import { getCustomer, getTransactions, getWalletTransactions } from "../../controllers/CustomerController";

const customerRoutes = express.Router();

customerRoutes.get("/customers", getCustomer);
customerRoutes.get("/wallet-transactions", getWalletTransactions);
customerRoutes.get("/ticket-transactions", getTransactions);

export default customerRoutes;