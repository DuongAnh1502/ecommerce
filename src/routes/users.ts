import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { errorHandler } from "../errorHandler";
import {
    addAddress,
    deleteAddress,
    listAddress,
    updateAddress,
    updateUser,
} from "../controllers/user";

const usersRoutes: Router = Router();
//Address
usersRoutes.post("/address", [authMiddleware], errorHandler(addAddress));
usersRoutes.delete(
    "/address/:id",
    [authMiddleware],
    errorHandler(deleteAddress)
);
usersRoutes.put("/address/:id", [authMiddleware], errorHandler(updateAddress));
usersRoutes.get("/address", [authMiddleware], errorHandler(listAddress));
//User
usersRoutes.put("/", [authMiddleware], errorHandler(updateUser));

export default usersRoutes;
