import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import adminMiddlewaare from "../middlewares/admin";
import { errorHandler } from "../errorHandler";
import { addAddress, deleteAddress, listAddress } from "../controllers/user";

const usersRoutes: Router = Router();

usersRoutes.post("/address", [authMiddleware], errorHandler(addAddress));
usersRoutes.delete(
    "/address/:id",
    [authMiddleware],
    errorHandler(deleteAddress)
);
usersRoutes.get("/address", [authMiddleware], errorHandler(listAddress));

export default usersRoutes;
