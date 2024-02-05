import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { errorHandler } from "../errorHandler";
import {
    addAddress,
    deleteAddress,
    listAddress,
    updateAddress,
} from "../controllers/user";

const usersRoutes: Router = Router();

usersRoutes.post("/address", [authMiddleware], errorHandler(addAddress));
usersRoutes.delete(
    "/address/:id",
    [authMiddleware],
    errorHandler(deleteAddress)
);
usersRoutes.put("/address/:id", [authMiddleware], errorHandler(updateAddress));
usersRoutes.get("/address", [authMiddleware], errorHandler(listAddress));

export default usersRoutes;
