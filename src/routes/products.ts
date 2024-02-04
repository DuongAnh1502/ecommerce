import { Router } from "express";
import { errorHandler } from "../errorHandler";
import { createProducts } from "../controllers/products";
import authMiddleware from "../middlewares/auth";
import adminMiddlewaare from "../middlewares/admin";

const productsRoutes: Router = Router();

productsRoutes.post(
    "/",
    [authMiddleware, adminMiddlewaare],
    errorHandler(createProducts)
);

export default productsRoutes;
