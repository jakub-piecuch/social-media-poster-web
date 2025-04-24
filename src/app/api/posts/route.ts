import { ErrorDetails, handleApiError } from "@/errors/error";
import { NextResponse } from "next/server";
import { PostsException } from "./posts.exception";
import { PostsMapper } from "./posts.mapper";
import { PostsService } from "./posts.service";
import { CreatePostRequest, PostResponse } from "./types/PostDto";

const postsService = new PostsService();
const mapper = new PostsMapper();

export async function POST(request: Request): Promise<NextResponse<PostResponse | ErrorDetails>> {
  console.log('[INFO] got request to create new post.');

  try {
    const body = await request.json();
    const postRequest = body as CreatePostRequest;
    const newPost = mapper.toDomainFromCreateRequest(postRequest)
    const createdPost = await postsService.createPost(newPost);
    const response = mapper.toResponse(createdPost);

    return NextResponse.json(response, { status: 201 });

  } catch (error: any) {
    return handleApiError(error);
  }
}

export async function GET(request: Request): Promise<NextResponse<PostResponse[] | ErrorDetails>> {
  console.log('[INFO] got request to find posts by userId.');
  
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  
  try {
    if (!userId) {
      throw PostsException.badRequest('Missing userId parameter');
    }

    const posts = await postsService.findAllPostsByUserId(userId);
    const response = posts.map(post => mapper.toResponse(post))

    return NextResponse.json(response, { status: 200 });

  } catch (error: any) {
    return handleApiError(error);
  }
}