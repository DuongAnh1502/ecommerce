import { Router } from "express";
import { errorHandler } from "../errorHandler";
import {
    cancelOrder,
    changeStatus,
    createOrder,
    getOrderById,
    listAllOrder,
    listOrders,
    listUserOrders,
} from "../controllers/orders";
import authMiddleware from "../middlewares/auth";
import adminMiddlewaare from "../middlewares/admin";

const orderRoutes: Router = Router();

orderRoutes.post("/", [authMiddleware], errorHandler(createOrder));
orderRoutes.get("/", [authMiddleware], errorHandler(listOrders));

orderRoutes.put("/:id/cancel", [authMiddleware], errorHandler(cancelOrder));
orderRoutes.get(
    "/users/:id",
    [authMiddleware, adminMiddlewaare],
    errorHandler(listUserOrders)
);
orderRoutes.get(
    "/index",
    [authMiddleware, adminMiddlewaare],
    errorHandler(listAllOrder)
);
orderRoutes.put(
    "/:id/status",
    [authMiddleware, adminMiddlewaare],
    errorHandler(changeStatus)
);
orderRoutes.get("/:id", [authMiddleware], errorHandler(getOrderById));
export default orderRoutes;
