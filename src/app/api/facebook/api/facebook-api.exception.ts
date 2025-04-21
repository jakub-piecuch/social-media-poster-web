// src/app/api/facebook/facebook-api.exception.ts
import { BaseException } from "@/errors/error";

export class FacebookApiException extends BaseException {
  errorType: string;
  
  constructor(message: string, status: number = 500, errorType: string = 'facebook_api_error') {
    super(message, status, errorType);
    this.errorType = errorType;
    
    // Set the prototype explicitly for proper instanceof behavior with TypeScript
    Object.setPrototypeOf(this, FacebookApiException.prototype);
  }

  static unauthorized(message: string = "Facebook API authorization failed"): FacebookApiException {
    return new FacebookApiException(message, 401, "facebook_unauthorized");
  }

  static tokenExpired(): FacebookApiException {
    return new FacebookApiException("Facebook token has expired", 401, "facebook_token_expired");
  }

  static permissionDenied(permission: string): FacebookApiException {
    return new FacebookApiException(`Permission '${permission}' was denied or not granted`, 403, "facebook_permission_denied");
  }

  static rateLimitExceeded(): FacebookApiException {
    return new FacebookApiException("Facebook API rate limit exceeded", 429, "facebook_rate_limit");
  }

  static invalidInput(message: string): FacebookApiException {
    return new FacebookApiException(message, 400, "facebook_invalid_input");
  }
}