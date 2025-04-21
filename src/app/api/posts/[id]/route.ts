import { ErrorDetails, handleApiError } from "@/errors/error";
import { NextRequest, NextResponse } from "next/server";
import { PostsMapper } from "../posts.mapper";
import { PostsService } from "../posts.service";
import { PostResponse } from "../types/PostDto";

const postsService = new PostsService();
const mapper = new PostsMapper();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string }}
): Promise<NextResponse<PostResponse | ErrorDetails>> {
  const { id }  = await params;
  console.log('[INFO] got request to find post by id.', id);
  
  try {
    const post = await postsService.findPostById(id);
    const response = mapper.toResponse(post);

    return NextResponse.json(response, { status: 200 });

  } catch (error: any) {
    return handleApiError(error);
  }
}