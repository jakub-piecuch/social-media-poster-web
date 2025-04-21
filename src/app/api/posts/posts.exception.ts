import { BaseException } from "@/errors/error";


export class PostsException extends BaseException {
  constructor(message: string, status: number = 500, reason?: string) {
    super(message, status, reason);
  }
}