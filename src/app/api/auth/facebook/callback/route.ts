// src/app/api/auth/facebook/callback/route.ts
import { NextRequest } from 'next/server';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { FacebookApiService } from '@/app/api/facebook/api/facebook-api.service';
import { FacebookAccountService } from '@/app/api/facebook/accounts/facebook-accounts.service';

const facebookAccountService = new FacebookAccountService();
const facebookApiService = new FacebookApiService();

/**
 * This route handles the OAuth callback from Facebook
 * It exchanges the code for an access token and creates a new Facebook account
 */
export async function GET(request: NextRequest) {
  try {
    // Extract the authorization code from the URL
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    
    // Check for errors
    if (error) {
      return new Response(JSON.stringify({
        error: error,
        message: searchParams.get('error_description') || 'Authentication failed'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Ensure code is present
    if (!code) {
      return new Response(JSON.stringify({
        error: 'missing_code',
        message: 'Authorization code is missing'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Get the current session to verify the user is logged in
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({
        error: 'unauthorized',
        message: 'You must be logged in to complete this action'
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Construct the URL with query parameters
    const tokenUrl = new URL(`https://graph.facebook.com/${process.env.FACEBOOK_API_VERSION}/oauth/access_token`);
    tokenUrl.searchParams.append('client_id', process.env.FACEBOOK_CLIENT_ID!);
    tokenUrl.searchParams.append('client_secret', process.env.FACEBOOK_CLIENT_SECRET!);
    tokenUrl.searchParams.append('redirect_uri', process.env.FACEBOOK_REDIRECT_URI!);
    tokenUrl.searchParams.append('code', code);
    
    // Exchange the code for an access token
    const tokenResponse = await fetch(tokenUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
    
    const tokenData = await tokenResponse.json();
    
    if (tokenData.error) {
      return new Response(JSON.stringify({
        error: 'token_exchange_failed',
        message: tokenData.error.message || 'Failed to exchange code for token'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Extract the access token
    const accessToken = tokenData.access_token;
    
    // Create a new Facebook account with this token
    await facebookAccountService.createFacebookAccount(accessToken, session.user.id || 'admin');
    
    // Redirect the user to the accounts page
    return redirect('/dashboard/facebook-accounts');
  } catch (error) {
    console.error('Error in Facebook callback:', error);
    
    return new Response(JSON.stringify({
      error: 'server_error',
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}