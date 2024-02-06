import { Router } from "express";

import authMiddleware from "../middlewares/auth";
import {
    addToCart,
    changeQuantity,
    getCart,
    removeFromCart,
} from "../controllers/cart";
import { errorHandler } from "../errorHandler";

const cartRoutes = Router();

cartRoutes.post("/", [authMiddleware], errorHandler(addToCart));
cartRoutes.get("/", [authMiddleware], errorHandler(getCart));
cartRoutes.put("/:id", [authMiddleware], errorHandler(changeQuantity));
cartRoutes.delete("/:id", [authMiddleware], errorHandler(removeFromCart));

export default cartRoutes;
