// src/app/api/auth/facebook/initiate/route.ts
import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { redirect } from 'next/navigation';

/**
 * This route initiates the Facebook OAuth flow
 * It redirects the user to Facebook's authorization page
 */
export async function GET(request: NextRequest) {
  try {
    // Check if the user is logged in
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({
        error: 'unauthorized',
        message: 'You must be logged in to add a Facebook account'
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Build the Facebook authorization URL
    const redirectUri = process.env.FACEBOOK_REDIRECT_URI;
    const clientId = process.env.FACEBOOK_CLIENT_ID;
    
    if (!redirectUri || !clientId) {
      return new Response(JSON.stringify({
        error: 'configuration_error',
        message: 'Facebook OAuth is not properly configured'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Define the required permissions (scopes)
    const scopes = [
      'public_profile',
      'email',
      'pages_show_list',
      'pages_read_engagement',
      'pages_manage_posts',
      'groups_access_member_info',
      'user_posts',
      'publish_to_groups'
    ].join(',');
    
    // Build the Facebook authorization URL
    const authUrl = new URL(`https://www.facebook.com/${process.env.FACEBOOK_API_VERSION}/dialog/oauth`);
    authUrl.searchParams.append('client_id', clientId);
    authUrl.searchParams.append('redirect_uri', redirectUri);
    authUrl.searchParams.append('scope', scopes);
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('state', session.user.id || 'admin'); // Used for CSRF protection
    
    // Redirect the user to Facebook's authorization page
    return redirect(authUrl.toString());
  } catch (error) {
    console.error('Error initiating Facebook authorization:', error);
    
    return new Response(JSON.stringify({
      error: 'server_error',
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}