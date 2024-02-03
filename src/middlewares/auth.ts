import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCodes } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "../index";

const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    //extract token from header
    const token = req.headers.authorization;
    //if token is not present, throw an error of unauthorized
    if (!token) {
        next(
            new UnauthorizedException("Unauthorized", ErrorCodes.UNAUTHORIZED)
        );
    }
    try {
        //if the token is present, verify the token and extract the payload
        const payload: { userId: number } = jwt.verify(
            token!,
            JWT_SECRET
        ) as any;
        //to get the user from the payload
        const user = await prismaClient.user.findFirst({
            where: { id: payload.userId },
        });
        if (!user) {
            next(
                new UnauthorizedException(
                    "Unauthorized",
                    ErrorCodes.UNAUTHORIZED
                )
            );
        }
        //to add the user to the request object
        req.user = user!;
        next();
    } catch (error: any) {
        next(
            new UnauthorizedException("Unauthorized", ErrorCodes.UNAUTHORIZED)
        );
    }
};
export default authMiddleware;
