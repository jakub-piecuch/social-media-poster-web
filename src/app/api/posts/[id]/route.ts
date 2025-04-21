import { BaseException, ErrorDetails } from "@/errors/error";
import { NextResponse } from "next/server";
import { PostsMapper } from "../posts.mapper";
import { PostsService } from "../posts.service";
import { PostResponse } from "../types/PostDto";

const postsService = new PostsService();
const mapper = new PostsMapper();

export async function GET(
  request: Request,
  { params }: { params: { id: string }}
): Promise<NextResponse<PostResponse | ErrorDetails>> {
  console.log('[INFO] got request to find post by id.');
  
  try {
    const post = await postsService.findPostById(params.id);
    const response = mapper.toResponse(post);

    return NextResponse.json(response, { status: 200 });

  } catch (error: any) {
    return handleError(error);
  }
}

function handleError(error: any) {
  if (error instanceof BaseException) {
    const errorDetails = error.toErrorDetails();
    return NextResponse.json(errorDetails, { status: error.status });
  }
  
  const errorDetails = {
    timestamp: new Date(),
    status: 500,
    reason: error.name || 'UnknownError',
    message: error.message || 'Internal Server Error'
  };
  
  return NextResponse.json(errorDetails, { status: 500 });
}