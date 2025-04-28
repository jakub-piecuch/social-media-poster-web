import { ErrorDetails, handleApiError } from "@/errors/error";
import { NextResponse } from "next/server";
import { SocialMediaUsersMapper } from "./s-m-user.mapper";
import { SocialMediaUserService } from "./s-m-user.service";
import { CreateSocialMediaUserRequest, SocialMediaUserResponse } from "./types/SocialMediaUserDto";

const socialMediaService = new SocialMediaUserService();
const mapper = new SocialMediaUsersMapper();

export async function POST(request: Request): Promise<NextResponse<SocialMediaUserResponse | ErrorDetails>> {
  console.log('[INFO] got request to create new s-m-user.');

  try {
    const body = await request.json();
    const postRequest = body as CreateSocialMediaUserRequest;
    const newSocialMediaUser = mapper.toDomainFromCreateRequest(postRequest)
    const createdPost = await socialMediaService.createSocialMediaUser(newSocialMediaUser);
    const response = mapper.toResponse(createdPost);

    return NextResponse.json(response, { status: 201 });

  } catch (error: any) {
    return handleApiError(error);
  }
}



export async function GET(request: Request): Promise<NextResponse<SocialMediaUserResponse[] | ErrorDetails>> {
  console.log('[INFO] got request to find s-m-users by criteria.');

  const { searchParams } = new URL(request.url);

  try {

    const users = await socialMediaService.fetchAllSocialMediaUsers();
    const response = users.map(user => mapper.toResponse(user))

    return NextResponse.json(response, { status: 200 });

  } catch (error: any) {
    return handleApiError(error);
  }
}