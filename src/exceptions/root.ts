interface ErrorProps {
    message: string;
    errorCode: any;
    statusCode: number;
    errors: any;
}
class HttpException extends Error {
    message: string;
    errorCode: any;
    statusCode: number;
    errors: any;
    constructor({ message, errorCode, statusCode, errors }: ErrorProps) {
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
}
