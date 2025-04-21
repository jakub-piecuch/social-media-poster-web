// src/app/api/facebook-account/[id]/route.ts
import { NextRequest } from 'next/server';
import { deleteFacebookAccount, getFacebookAccountById, updateFacebookAccountStatus } from '../../accounts/facebook-accounts.controller';

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
  await getFacebookAccountById(req as any, res as any);
  
  // Return the response in the App Router format
  return new Response(JSON.stringify(responseData), {
    status: statusCode,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Get the body data
  const requestData = await request.json();
  
  // Create a response object to capture the response
  let responseData: any = null;
  let statusCode: number = 200;
  
  // Create mock req/res objects that work with your existing controller
  const req = {
    body: requestData,
    query: { id: params.id },
    method: 'PATCH'
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
  await updateFacebookAccountStatus(req as any, res as any);
  
  // Return the response in the App Router format
  return new Response(JSON.stringify(responseData), {
    status: statusCode,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Create a response object to capture the response
  let responseData: any = null;
  let statusCode: number = 200;
  
  // Create mock req/res objects that work with your existing controller
  const req = {
    query: { id: params.id },
    method: 'DELETE'
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
  await deleteFacebookAccount(req as any, res as any);
  
  // Return the response in the App Router format
  return new Response(JSON.stringify(responseData), {
    status: statusCode,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}