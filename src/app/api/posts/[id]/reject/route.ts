import { handleApiError } from "@/errors/error";
import { NextRequest, NextResponse } from "next/server";
import { PostsService } from "../../posts.service";

const postsService = new PostsService();

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const { id } = await params
  console.log('[INFO] got request to submit post:', id)

  try {
    const result = await postsService.rejectPostById(id)

    return NextResponse.json(result, { status: 200 })

  } catch (error: any) {
    return handleApiError(error);
  }
}