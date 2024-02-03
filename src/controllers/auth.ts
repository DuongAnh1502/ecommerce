import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../index";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestException } from "../exceptions/bad-requests";
import { ErrorCodes } from "../exceptions/root";
import { UnprocessableEntity } from "../exceptions/validation";
import { SignUpSchema } from "../schema/users";

export const signup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        SignUpSchema.parse(req.body);
        const { email, password, name } = req.body;
        let user = await prismaClient.user.findFirst({ where: { email } });
        if (user) {
            next(
                new BadRequestException(
                    "User already exists!",
                    ErrorCodes.USER_ALREADY_EXISTS
                )
            );
        }
        user = await prismaClient.user.create({
            data: { email, password: hashSync(password, 10), name },
        });
        res.json(user);
    } catch (err: any) {
        next(
            new UnprocessableEntity(
                "Unprocessable Entity",
                ErrorCodes.UNPROCESSABLE_ENTITY,
                err?.issues
            )
        );
    }
};

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, password } = req.body;

    let user = await prismaClient.user.findFirst({ where: { email } });
    if (!user) {
        next(
            new BadRequestException(
                "User does not exists!",
                ErrorCodes.USER_NOT_FOUND
            )
        );
        return;
    }
    if (!compareSync(password, user.password)) {
        next(
            new BadRequestException(
                "Incorrect password!",
                ErrorCodes.INCORRECT_PASSWORD
            )
        );
        return;
    }
    const token = jwt.sign(
        {
            userId: user.id,
        },
        JWT_SECRET
    );
    res.json({ user, token });
};
