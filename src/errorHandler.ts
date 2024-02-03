import { NextFunction } from "express";
import { ErrorCodes, HttpException } from "./exceptions/root";
import { InternalException } from "./exceptions/internal-exception";

export const errorHandler = (method: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            method(req, res, next);
        } catch (err: any) {
            let exception: HttpException;
            if (err instanceof HttpException) {
                exception = err;
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
