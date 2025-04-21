// src/app/api/facebook-account/route.ts
import { NextRequest } from 'next/server';
import { createFacebookAccount, getAllFacebookAccounts } from '../accounts/facebook-accounts.controller';

export async function POST(request: NextRequest) {
  // Create a response object to capture the response
  let responseData: any = null;
  let statusCode: number = 200;
  
  // Get the body data
  const userData = await request.json();
  
  // Create mock req/res objects that work with your existing controller
  const req = {
    body: userData,
    method: 'POST'
  };
  
  const res = {
    status: (code: number) => {
      statusCode = code;
      return res;
    },
    json: (data: any) => {
      responseData = data;
      return res;
    }
  };
  
  // Call your existing controller function
  await createFacebookAccount(req as any, res as any);
  
  // Return the response in the App Router format
  return new Response(JSON.stringify(responseData), {
    status: statusCode,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export async function GET(request: NextRequest) {
  // Create a response object to capture the response
  let responseData: any = null;
  let statusCode: number = 200;
  
  // Extract query parameters
  const searchParams = request.nextUrl.searchParams;
  const limit = searchParams.get('limit');
  const skip = searchParams.get('skip');
  
  // Create mock req/res objects that work with your existing controller
  const req = {
    query: {
      limit,
      skip
    },
    method: 'GET'
  };
  
  const res = {
    status: (code: number) => {
      statusCode = code;
      return res;
    },
    json: (data: any) => {
      responseData = data;
      return res;
    }
  };
  
  // Call your existing controller function
  await getAllFacebookAccounts(req as any, res as any);
  
  // Return the response in the App Router format
  return new Response(JSON.stringify(responseData), {
    status: statusCode,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}