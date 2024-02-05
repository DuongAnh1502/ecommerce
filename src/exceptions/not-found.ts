import { ErrorCodes, HttpException } from "./root";

export class NotFoundException extends HttpException {
    constructor(message: string, errorCode: ErrorCodes, err?: any) {
        super(message, errorCode, 404, err);
    }
}
