// src/app/api/social-media-user/[id]/route.ts
import { findSocialMediaUserById, updateSocialMediaUser } from '@/app/api/social-media-user/s-m.user.controller';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Create a response object to capture the response
  let responseData: any = null;
  let statusCode: number = 200;
  
  // Create mock req/res objects that work with your existing controller
  const req = {
    query: { id: params.id },
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
  await findSocialMediaUserById(req as any, res as any);
  
  // Return the response in the App Router format
  return new Response(JSON.stringify(responseData), {
    status: statusCode,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Get the body data
  const userData = await request.json();
  
  // Create a response object to capture the response
  let responseData: any = null;
  let statusCode: number = 200;
  
  // Create mock req/res objects that work with your existing controller
  const req = {
    body: userData,
    query: { id: params.id },
    method: 'PUT'
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
  await updateSocialMediaUser(req as any, res as any);
  
  // Return the response in the App Router format
  return new Response(JSON.stringify(responseData), {
    status: statusCode,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}