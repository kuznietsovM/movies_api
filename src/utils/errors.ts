import { ZodError } from "zod";

type Fields = Record<string, string | number | boolean | string[]>

interface ErrorResponse {
  status: 0;
  message: string
  error: {
    fields?: Fields;
    code: string;
  };
}

export class ApiError extends Error {
  public statusCode: number;
  public errorCode: string;
  public fields?: Fields;

  constructor(
    statusCode: number,
    errorCode: string,
    message: string,
    fields?: Fields,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.fields = fields;
  }

  toResponse(): ErrorResponse {
    return {
      status: 0,
      message: this.message,
      error: {
        ...(this.fields && Object.keys(this.fields).length > 0 && { fields: this.fields }),
        code: this.errorCode,
      },
    };
  }
}

export class EmailNotUniqueError extends ApiError {
  constructor(field: string, fieldValue: string) {
    super(
      409,
      'EMAIL_NOT_UNIQUE',
      `User with ${field} '${fieldValue}' already exists.`,
      { [field]: 'NOT_UNIQUE' }
    );
  }
}

export class AuthenticationError extends ApiError {
  constructor(message: string, fieldNames: string[]) {
    const fields: Record<string, string> = {};

    fieldNames.forEach(name => {
      fields[name] = 'AUTHENTICATION_FAILED'
    })

    super(
      401, 
      'AUTHENTICATION_FAILED',
      message,
      fields
    );
  }
}

export class MovieExistsError extends ApiError {
  constructor(field: string, fieldValue: string) {
    super(
      409,
      'MOVIE_EXISTS',
      `Movie with ${field} '${fieldValue}' already exists.`,
      { [field]: 'NOT_UNIQUE' }
    );
  }
}

export class FormatError extends ApiError {
  constructor(field: string) {
    super(
      400,
      'FORMAT_ERROR',
      `Field '${field}' has an invalid format or is missing.`,
      { [field]: 'REQUIRED' }
    );
  }
}

export class EmptyFileError extends ApiError {
  constructor() {
    super(
      400,
      'EMPTY_FILE_ERROR',
      `Empty file provided.`
    )
  }
}

export class FileFormatError extends ApiError {
  constructor(format: string) {
    super(
      400,
      'FILE_FORMAT_ERROR',
      `Unsupported file format`,
      { format }
    )
  }
}

export class MovieNotFoundError extends ApiError {
  constructor(id: number) {
    super(
      404,
      'MOVIE_NOT_FOUND',
      `Movie with ID '${id}' not found.`,
      { id: id }
    );
  }
}

export class ValidationError extends ApiError {
  constructor(zodError: ZodError, message: string = 'Validation failed.') {
    super(
      400,
      'VALIDATION_FAILED',
      message,
      zodError.format()
    )
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string = 'An unexpected error occurred.') {
    super(
      500,
      'INTERNAL_SERVER_ERROR',
      message
    );
  }
}