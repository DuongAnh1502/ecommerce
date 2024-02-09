import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { errorHandler } from "../errorHandler";
import {
    addAddress,
    changeUserRole,
    deleteAddress,
    getUserById,
    listAddress,
    listUsers,
    updateAddress,
    updateUser,
} from "../controllers/user";
import adminMiddlewaare from "../middlewares/admin";

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

usersRoutes.put(
    "/role",
    [authMiddleware, adminMiddlewaare],
    errorHandler(changeUserRole)
);
usersRoutes.get(
    "/",
    [authMiddleware, adminMiddlewaare],
    errorHandler(listUsers)
);
usersRoutes.get(
    "/:id",
    [authMiddleware, adminMiddlewaare],
    errorHandler(getUserById)
);

export default usersRoutes;
