// src/lib/repository-wrapper.ts

import { connectToDatabase } from './mongoose';

/**
 * A higher-order function that wraps repository methods to ensure
 * database connection is established before executing database operations
 *
 * @param repositoryMethod - The repository method to wrap
 * @returns A function that ensures database connection before executing the repository method
 */
export function withConnection<T extends (...args: any[]) => Promise<any>>(
  repositoryMethod: T
): (...args: Parameters<T>) => ReturnType<T> {
  return async (...args: Parameters<T>): ReturnType<T> => {
    try {
      // Ensure database connection is established
      await connectToDatabase();
      
      // Execute the repository method
      return await repositoryMethod(...args);
    } catch (error) {
      console.error('Repository operation failed:', error);
      throw error;
    }
  };
}