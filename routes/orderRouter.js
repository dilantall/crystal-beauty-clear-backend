import { createOrder, getOrders } from "../controllers/oederControll.js";
import express from "express"

const orderRouter=express.Router();

orderRouter.post("/",createOrder)
orderRouter.get("/",getOrders)

export default orderRouter;