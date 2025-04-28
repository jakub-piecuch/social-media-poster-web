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

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string }}
): Promise<NextResponse<PostResponse | ErrorDetails>> {
  const { id } = await params;
  console.log('[INFO] got request to update post by id.', id);

  try {
    const body = await request.json();
    const { content } = body;

    if (!content) {
      return NextResponse.json(
        { 
          timestamp: new Date(),
          status: 400,
          reason: "Bad Request",
          message: "Content is required" 
        } as ErrorDetails, 
        { status: 400 }
      );
    }

    // Fetch the existing post
    const existingPost = await postsService.findPostById(id);
    
    // Check if the post is already submitted - prevent updates if it is
    if (existingPost.submitted) {
      return NextResponse.json(
        {
          timestamp: new Date(),
          status: 400,
          reason: "Bad Request",
          message: "Cannot update a post that has already been submitted"
        } as ErrorDetails,
        { status: 400 }
      );
    }

    // Update the post with new content
    existingPost.content = content;
    
    // Call a new method in the PostsService to update the post
    const updatedPost = await postsService.updatePost(existingPost);
    const response = mapper.toResponse(updatedPost);

    return NextResponse.json(response, { status: 200 });

  } catch (error: any) {
    return handleApiError(error);
  }
}