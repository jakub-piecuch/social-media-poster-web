import { ErrorDetails, handleApiError } from "@/errors/error";
import { NextResponse } from "next/server";
import { PostsMapper } from "./posts.mapper";
import { PostsService } from "./posts.service";
import { CreatePostRequest, PostResponse } from "./types/PostDto";
import { Post } from "./types/Post";
import { PlatformEnum } from "@/app/types/GlobalEnum";
import { group } from "console";

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
  console.log('[INFO] got request to find posts by criteria.');

  const { searchParams } = new URL(request.url);
  const platform = searchParams.get('platform');
  const groupId = searchParams.get('groupId');

  console.log('platform:', platform)
  console.log('groupId:', groupId)

  // const criteria: Partial<Post> = {
  //   platform: platform as PlatformEnum || undefined,
  //   groupId: groupId ?? undefined,
  // };

  try {

    const posts = await postsService.finAllPostsByCriteria();
    const response = posts.map(post => mapper.toResponse(post))

    return NextResponse.json(response, { status: 200 });

  } catch (error: any) {
    return handleApiError(error);
  }
}