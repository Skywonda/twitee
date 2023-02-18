"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationError = exports.AuthenticationError = exports.ConflictError = exports.NotFoundError = exports.BadRequestError = void 0;
class AppError extends Error {
    constructor(message) {
        super(message);
    }
}
class BadRequestError extends AppError {
    constructor(message) {
        super(message);
        this.statusCode = 400;
    }
}
exports.BadRequestError = BadRequestError;
class NotFoundError extends AppError {
    constructor(message) {
        super(message);
        this.statusCode = 404;
    }
}
exports.NotFoundError = NotFoundError;
class ConflictError extends AppError {
    constructor(message) {
        super(message);
        this.statusCode = 409;
    }
}
exports.ConflictError = ConflictError;
class AuthenticationError extends AppError {
    constructor(message) {
        super(message);
        this.statusCode = 401;
    }
}
exports.AuthenticationError = AuthenticationError;
class AuthorizationError extends AppError {
    constructor(message) {
        super(message);
        this.statusCode = 409;
    }
}
exports.AuthorizationError = AuthorizationError;
