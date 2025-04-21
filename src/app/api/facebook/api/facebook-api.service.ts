// src/app/api/facebook/facebook-api.service.ts
import { FacebookApiData } from '../../social-media-user/types/FacebookApiData';
import { FacebookApiException } from './facebook-api.exception';

// Response types for better type checking
interface FacebookErrorResponse {
  error: {
    message: string;
    type: string;
    code: number;
    error_subcode?: number;
    fbtrace_id: string;
  };
}

interface FacebookSuccessResponse<T> {
  data?: T;
  id?: string;
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
    previous?: string;
  };
}

export class FacebookApiService {
  private apiVersion: string;
  private baseUrl: string;

  constructor() {
    this.apiVersion = process.env.FACEBOOK_API_VERSION || 'v18.0';
    this.baseUrl = `https://graph.facebook.com/${this.apiVersion}`;
  }

  /**
   * Generic method to call Facebook Graph API
   */
  private async callApi<T>(
    endpoint: string,
    accessToken: string,
    method: 'GET' | 'POST' | 'DELETE' = 'GET',
    params?: Record<string, string>
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}/${endpoint}`);
    
    // Add access token to all requests
    url.searchParams.append('access_token', accessToken);
    
    // Add additional parameters for GET requests
    if (method === 'GET' && params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    // Add body for POST requests
    if (method === 'POST' && params) {
      options.body = JSON.stringify(params);
    }

    try {
      const response = await fetch(url.toString(), options);
      const data = await response.json();

      // Check for Facebook API errors
      if ('error' in data) {
        const errorResponse = data as FacebookErrorResponse;
        throw new FacebookApiException(
          errorResponse.error.message,
          errorResponse.error.code,
          errorResponse.error.type
        );
      }

      return data as T;
    } catch (error) {
      if (error instanceof FacebookApiException) {
        throw error;
      }
      
      // Convert other errors to FacebookApiException
      throw new FacebookApiException(
        error instanceof Error ? error.message : 'Unknown error occurred',
        500,
        'api_exception'
      );
    }
  }

  /**
   * Verify if a token is valid and get its details
   */
  async verifyAccessToken(accessToken: string): Promise<{
    app_id: string;
    type: string;
    application: string;
    data_access_expires_at: number;
    expires_at: number;
    is_valid: boolean;
    scopes: string[];
    user_id: string;
  }> {
    const response = await this.callApi<any>(
      'debug_token',
      accessToken,
      'GET',
      { input_token: accessToken }
    );
    
    return response.data;
  }

  /**
   * Get user profile information
   */
  async getUserProfile(accessToken: string): Promise<{
    id: string;
    name: string;
    email?: string;
    picture?: {
      data: {
        height: number;
        is_silhouette: boolean;
        url: string;
        width: number;
      };
    };
  }> {
    return this.callApi<any>('me', accessToken, 'GET', {
      fields: 'id,name,email,picture'
    });
  }

  /**
   * Get user's Facebook pages
   */
  async getUserPages(accessToken: string): Promise<{
    id: string;
    name: string;
    access_token: string;
    category: string;
  }[]> {
    const response = await this.callApi<FacebookSuccessResponse<{
      id: string;
      name: string;
      access_token: string;
      category: string;
    }[]>>('me/accounts', accessToken);
    
    return response.data || [];
  }

  /**
   * Get posts from a Facebook group
   */
  async getGroupPosts(groupId: string, accessToken: string, limit: number = 25): Promise<any[]> {
    const response = await this.callApi<FacebookSuccessResponse<any[]>>(
      `${groupId}/feed`,
      accessToken,
      'GET',
      {
        fields: 'id,message,created_time,from,comments.limit(0).summary(true),reactions.limit(0).summary(true)',
        limit: limit.toString()
      }
    );
    
    return response.data || [];
  }

  /**
   * Post a message to a Facebook group
   */
  async postToGroup(groupId: string, message: string, accessToken: string): Promise<{ id: string }> {
    return this.callApi<{ id: string }>(
      `${groupId}/feed`,
      accessToken,
      'POST',
      { message }
    );
  }

  /**
   * Comment on a post
   */
  async commentOnPost(postId: string, message: string, accessToken: string): Promise<{ id: string }> {
    return this.callApi<{ id: string }>(
      `${postId}/comments`,
      accessToken,
      'POST',
      { message }
    );
  }

  /**
   * Get comments on a post
   */
  async getPostComments(postId: string, accessToken: string, limit: number = 25): Promise<any[]> {
    const response = await this.callApi<FacebookSuccessResponse<any[]>>(
      `${postId}/comments`,
      accessToken,
      'GET',
      {
        fields: 'id,message,from,created_time,comment_count,like_count',
        limit: limit.toString()
      }
    );
    
    return response.data || [];
  }

  /**
   * Check if token needs refresh based on expiry date
   */
  isTokenExpired(facebookAuth: FacebookApiData): boolean {
    // Add buffer of 1 hour to ensure we refresh before actual expiry
    const expiryWithBuffer = new Date(facebookAuth.expiresAt);
    expiryWithBuffer.setHours(expiryWithBuffer.getHours() - 1);
    
    return new Date() > expiryWithBuffer;
  }

  /**
   * Refresh an access token if possible
   * Note: Long-lived tokens can last up to 60 days
   */
  async refreshAccessToken(refreshToken: string): Promise<{
    access_token: string;
    token_type: string;
    expires_in: number;
  }> {
    return this.callApi<any>(
      'oauth/access_token',
      '',
      'GET',
      {
        grant_type: 'fb_exchange_token',
        client_id: process.env.FACEBOOK_CLIENT_ID!,
        client_secret: process.env.FACEBOOK_CLIENT_SECRET!,
        fb_exchange_token: refreshToken
      }
    );
  }
}