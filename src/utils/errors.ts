import { ZodError } from "zod"

/**
 * Http Errors definition for errorMiddleware
 */

/**
 * Base HttpError has method to construct response body
 */
class HttpError extends Error {
    constructor(
        public statusCode: number, 
        public message: string, 
    ) {
        super(message)
    }

    responseBody(): any {
        return {
            status: 0,
            message: this.message
        }
    }
}

/**
 * BadRequestError occures when request is invalid
 */
class BadRequestError extends HttpError {
    constructor(private zodError?: ZodError, message?: string) {
        super(400, message ? `Bad Request: ${message}` : "Bad Request")
    }
    responseBody() {
        const resp = super.responseBody()
        return {reasons: this.zodError?.format(), ...resp}
    }
}

/**
 * AuthenticationError (401 Unauthorized) occures when
 * server cannot reveal user's identity
 */
class AuthenticationError extends HttpError {
    constructor(message?: string) {
        super(401, "Unauthorized " + (message ? `: ${message}` : ""))
    }
}

/**
 * ForbiddenError (403 Forbidden) occures when
 * user does not have sufficient rights to call this method 
 */
class ForbiddenError extends HttpError {
    constructor(message?: string) {
        super(403, "Forbidden " + (message ? `: ${message}` : ""))
    }
}

/**
 * NotFoundError occures when resource cannot be found by a server
 */
class NotFoundError extends HttpError {
    constructor(message?: string) {
        super(404, "Resource not found " + (message ? `: ${message}` : ""))
    }
}

/**
 * ConflictError occures on unique resource is already created
 */
class ConflictError extends HttpError {
    constructor(message?: string) {
        super(409, "Conflict " + (message ? `: ${message}` : ""))
    }
}

/**
 * InternalError occures when other service/app returned BadRequest.
 */
class InternalError extends HttpError {
    constructor(message?: string) {
        super(500, "Internal error " + (message ? `: ${message}` : ""))
    }
}


export {
    HttpError,
    BadRequestError,
    AuthenticationError,
    ForbiddenError,
    NotFoundError,
    ConflictError,
    InternalError,
}