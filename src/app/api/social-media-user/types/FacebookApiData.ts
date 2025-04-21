export interface FacebookApiData {
  accessToken: string;
  refreshToken?: string;
  expiresAt: Date;
  scopes: string[];
  facebookUserId: string;
  isActive: boolean;
}