import { NextFunction, Request, Response } from "express";
import { ErrorCodes, HttpException } from "./exceptions/root";
import { InternalException } from "./exceptions/internal-exception";
import { z } from "zod";
import { UnprocessableEntity } from "./exceptions/validation";

export const errorHandler = (method: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await method(req, res, next);
        } catch (err: any) {
            let exception: HttpException;
            if (err instanceof HttpException) {
                exception = err;
            }
            if (err instanceof z.ZodError) {
                exception = new UnprocessableEntity(
                    "Validation failed",
                    ErrorCodes.UNPROCESSABLE_ENTITY,
                    err.errors[0].message
                );
            } else {
                exception = new InternalException(
                    "Something went wrong!",
                    err,
                    ErrorCodes.INTERNAL_EXCEPTION
                );
            }
            next(exception);
        }
    };
};
