import { Router } from "express";
import { errorHandler } from "../errorHandler";
import {
    createProduct,
    deleteProduct,
    getProductById,
    listProducts,
    updateProduct,
} from "../controllers/products";
import authMiddleware from "../middlewares/auth";
import adminMiddlewaare from "../middlewares/admin";

const productsRoutes: Router = Router();

productsRoutes.post(
    "/",
    [authMiddleware, adminMiddlewaare],
    errorHandler(createProduct)
);
productsRoutes.get("/", errorHandler(listProducts));
productsRoutes.get("/:id", errorHandler(getProductById));
productsRoutes.delete(
    "/:id",
    [authMiddleware, adminMiddlewaare],
    errorHandler(deleteProduct)
);
productsRoutes.put(
    "/:id",
    [authMiddleware, adminMiddlewaare],
    errorHandler(updateProduct)
);
export default productsRoutes;
