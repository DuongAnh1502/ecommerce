import { Router } from "express";
import { errorHandler } from "../errorHandler";
import { createProducts } from "../controllers/products";
import authMiddleware from "../middlewares/auth";

const productsRoutes: Router = Router();

productsRoutes.post("/", [authMiddleware], errorHandler(createProducts));

export default productsRoutes;
