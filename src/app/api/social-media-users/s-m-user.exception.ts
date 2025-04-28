import { BaseException } from "@/errors/error";


export class SocialMediaUserException extends BaseException {
  constructor(message: string, status: number = 500, reason?: string) {
    super(message, status, reason);
  }

  static userAlreadyExists(): SocialMediaUserException {
    return new SocialMediaUserException("Provide unique username", 409, "UserAlreadyExists");
  }
}