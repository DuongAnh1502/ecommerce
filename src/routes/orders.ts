import { Router } from "express";
import { errorHandler } from "../errorHandler";
import {
    cancelOrder,
    createOrder,
    getOrderById,
    listOrders,
} from "../controllers/orders";
import authMiddleware from "../middlewares/auth";

const orderRoutes: Router = Router();

orderRoutes.post("/", [authMiddleware], errorHandler(createOrder));
orderRoutes.get("/", [authMiddleware], errorHandler(listOrders));
orderRoutes.get("/:id", [authMiddleware], errorHandler(getOrderById));
orderRoutes.put("/:id/cancel", [authMiddleware], errorHandler(cancelOrder));

export default orderRoutes;
