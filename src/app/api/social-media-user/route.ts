// src/app/api/social-media-user/route.ts
import { createSocialMediaUser } from '@/app/api/social-media-user/s-m.user.controller';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  // Get the body data
  const userData = await request.json();
  
  // Create a response object to capture the response
  let responseData: any = null;
  let statusCode: number = 200;
  
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
  await createSocialMediaUser(req as any, res as any);
  
  // Return the response in the App Router format
  return new Response(JSON.stringify(responseData), {
    status: statusCode,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}