// src/app/api/facebook/facebook-account.service.ts
import { SocialMediaUserRepository } from "../../social-media-user/s-m-user.repository";
import { SocialMediaUser } from "../../social-media-user/types/SocialMediaUser";
import { FacebookApiData } from "../../social-media-user/types/FacebookApiData";
import { FacebookApiService } from "../api/facebook-api.service";
import { FacebookApiException } from "../api/facebook-api.exception";
import { SocialMediaUserException } from "../../social-media-user/s-m-user.exception";

export class FacebookAccountService {
  private repository: SocialMediaUserRepository;
  private facebookApiService: FacebookApiService;

  constructor() {
    this.repository = new SocialMediaUserRepository();
    this.facebookApiService = new FacebookApiService();
  }

  /**
   * Create a new Facebook account using OAuth token data
   */
  async createFacebookAccount(accessToken: string, adminUserId: string): Promise<SocialMediaUser> {
    try {
      // Verify the token and get user information
      const tokenInfo = await this.facebookApiService.verifyAccessToken(accessToken);
      const userProfile = await this.facebookApiService.getUserProfile(accessToken);
      
      if (!tokenInfo.is_valid) {
        throw FacebookApiException.unauthorized("Invalid Facebook access token");
      }
      
      // Calculate token expiration date
      const expiresAt = new Date();
      expiresAt.setSeconds(expiresAt.getSeconds() + tokenInfo.expires_at);
      
      // Check if this Facebook account already exists
      const existingAccount = await this.findByFacebookUserId(tokenInfo.user_id);
      if (existingAccount) {
        throw SocialMediaUserException.userAlreadyExists();
      }
      
      // Create a new SocialMediaUser for this Facebook account
      const newFacebookUser = new SocialMediaUser({
        id: '',
        username: userProfile.name, // Use Facebook name as username
        platform: 'facebook',
        createdAt: new Date(),
        updatedAt: new Date(),
        facebookAuth: {
          accessToken: accessToken,
          refreshToken: accessToken, // Store long-lived token as refresh token too
          expiresAt: expiresAt,
          scopes: tokenInfo.scopes,
          facebookUserId: tokenInfo.user_id,
          isActive: true
        }
      });
      
      // Save the new Facebook account
      return this.repository.save(newFacebookUser);
    } catch (error) {
      if (error instanceof FacebookApiException || error instanceof SocialMediaUserException) {
        throw error;
      }
      throw new FacebookApiException(
        error instanceof Error ? error.message : 'Failed to create Facebook account',
        500
      );
    }
  }

  /**
   * Find a Facebook account by Facebook user ID
   */
  async findByFacebookUserId(facebookUserId: string): Promise<SocialMediaUser | null> {
    // Using MongoDB query syntax to find a document with matching facebookAuth.facebookUserId
    const entities = await this.repository.findByQuery({
      'facebookAuth.facebookUserId': facebookUserId
    });
    
    return entities.length > 0 ? entities[0] : null;
  }

  /**
   * Get all Facebook accounts
   */
  async findAllFacebookAccounts(limit?: number, skip?: number): Promise<SocialMediaUser[]> {
    return this.repository.findByQuery({ platform: 'facebook' }, limit, skip);
  }

  /**
   * Update a Facebook account with new token information
   */
  async updateFacebookToken(
    id: string, 
    accessToken: string, 
    expiresIn: number
  ): Promise<SocialMediaUser | null> {
    const socialMediaUser = await this.repository.findById(id);
    
    if (!socialMediaUser || socialMediaUser.platform !== 'facebook' || !socialMediaUser.facebookAuth) {
      return null;
    }
    
    // Calculate new expiry date
    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + expiresIn);
    
    // Update token information
    const updatedUser = new SocialMediaUser({
      ...socialMediaUser,
      updatedAt: new Date(),
      facebookAuth: {
        ...socialMediaUser.facebookAuth,
        accessToken: accessToken,
        expiresAt: expiresAt
      }
    });
    
    return this.repository.save(updatedUser);
  }

  /**
   * Toggle active status of a Facebook account
   */
  async toggleAccountStatus(id: string, isActive: boolean): Promise<SocialMediaUser | null> {
    const socialMediaUser = await this.repository.findById(id);
    
    if (!socialMediaUser || socialMediaUser.platform !== 'facebook' || !socialMediaUser.facebookAuth) {
      return null;
    }
    
    // Update active status
    const updatedUser = new SocialMediaUser({
      ...socialMediaUser,
      updatedAt: new Date(),
      facebookAuth: {
        ...socialMediaUser.facebookAuth,
        isActive: isActive
      }
    });
    
    return this.repository.save(updatedUser);
  }

  /**
   * Refresh token if it's expired
   */
  async refreshTokenIfNeeded(socialMediaUser: SocialMediaUser): Promise<SocialMediaUser> {
    if (!socialMediaUser.facebookAuth) {
      throw new FacebookApiException('Not a Facebook account', 400);
    }
    
    // If token is not expired, return the user as is
    if (!this.facebookApiService.isTokenExpired(socialMediaUser.facebookAuth)) {
      return socialMediaUser;
    }
    
    // We need to refresh the token
    try {
      // Using the refresh token (long-lived token in our case)
      const refreshTokenResponse = await this.facebookApiService.refreshAccessToken(
        socialMediaUser.facebookAuth.refreshToken || socialMediaUser.facebookAuth.accessToken
      );
      
      // Update the user with the new token
      return this.updateFacebookToken(
        socialMediaUser.id,
        refreshTokenResponse.access_token,
        refreshTokenResponse.expires_in
      ) as Promise<SocialMediaUser>;
    } catch (error) {
      throw FacebookApiException.tokenExpired();
    }
  }

  /**
   * Delete a Facebook account
   */
  async deleteFacebookAccount(id: string): Promise<boolean> {
    return this.repository.deleteById(id);
  }
}