import { Router } from "express";
import { errorHandler } from "../errorHandler";
import {
    createProduct,
    deleteProduct,
    getProductById,
} from "../controllers/products";
import authMiddleware from "../middlewares/auth";
import adminMiddlewaare from "../middlewares/admin";

const productsRoutes: Router = Router();

productsRoutes.post(
    "/",
    [authMiddleware, adminMiddlewaare],
    errorHandler(createProduct)
);
productsRoutes.get("/:id", errorHandler(getProductById));
productsRoutes.delete(
    "/:id",
    [authMiddleware, adminMiddlewaare],
    errorHandler(deleteProduct)
);
export default productsRoutes;
