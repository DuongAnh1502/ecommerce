import { ErrorCodes, HttpException } from "./root";

export class UnauthorizedException extends HttpException {
    constructor(message: string, errorCode: ErrorCodes, errors?: any) {
        super(message, errorCode, 401, errors);
    }
}
