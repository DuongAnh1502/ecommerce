export class HttpException extends Error {
    message: string;
    errorCode: any;
    statusCode: number;
    errors: ErrorCodes;
    constructor(
        message: string,
        errorCode: ErrorCodes,
        statusCode: number,
        errors: any
    ) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = errors;
    }
}
export enum ErrorCodes {
    USER_NOT_FOUND = 1001,
    USER_ALREADY_EXISTS = 1002,
    INCORRECT_PASSWORD = 1003,
    ADDRESS_NOT_FOUND = 1004,
    UNAUTHORIZED = 4001,
    UNPROCESSABLE_ENTITY = 2001,
    INTERNAL_EXCEPTION = 3001,
    PRODUCT_NOT_FOUND = 4001,
}
