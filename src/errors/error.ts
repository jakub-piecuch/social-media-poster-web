export interface ErrorDetails {
  timestamp: Date
  status: number
  reason: string
  message: string
}

export class BaseException extends Error {
  status: number;
  reason?: string;

  constructor(message: string, status: number = 500, reason?: string) {
    super(message);
    this.status = status;
    this.reason = reason;
    
    // Set the prototype explicitly for proper instanceof behavior with TypeScript
    Object.setPrototypeOf(this, this.constructor.prototype);
  }

  static notFound(reason?: string): BaseException {
    return new this("Not Found", 404, reason);
  }

  static badRequest(reason?: string): BaseException {
    return new this("Bad Request", 400, reason);
  }

  static unauthorized(reason?: string): BaseException {
    return new this("Unauthorized", 401, reason);
  }

  static forbidden(reason?: string): BaseException {
    return new this("Forbidden", 403, reason);
  }

  static conflict(reason?: string): BaseException {
    return new this("Conflict", 409, reason);
  }

  static internalServerError(reason?: string): BaseException {
    return new this("Internal Server Error", 500, reason);
  }

  // Convert to ErrorDetails for API responses
  toErrorDetails(): ErrorDetails {
    return {
      timestamp: new Date(),
      status: this.status,
      reason: this.reason || this.constructor.name,
      message: this.message,
    };
  }
}