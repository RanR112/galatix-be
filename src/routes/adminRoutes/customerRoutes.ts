import express from "express";
import { getCustomer } from "../../controllers/CustomerController";

const customerRoutes = express.Router();

customerRoutes.get("/customers", getCustomer);

export default customerRoutes;