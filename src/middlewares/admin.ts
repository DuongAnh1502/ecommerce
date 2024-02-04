import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCodes } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "../index";

const adminMiddlewaare = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    //extract user from req
    const user = req.user;
    if (user.roleName !== "ADMIN") {
        next(
            new UnauthorizedException("Unauthorized", ErrorCodes.UNAUTHORIZED)
        );
    }
    next();
};
export default adminMiddlewaare;
