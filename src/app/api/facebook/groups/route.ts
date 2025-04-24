import { ErrorDetails, handleApiError } from "@/errors/error";
import { GroupsService } from "./groups.service";
import { GroupsMapper } from "./groups.mapper";
import { NextRequest, NextResponse } from "next/server";
import { CreateGroupRequest, GroupResponse } from "./types/GroupDto";

const groupsService = new GroupsService();
const mapper = new GroupsMapper();

export async function POST(request: NextRequest): Promise<NextResponse<GroupResponse | ErrorDetails >> {
  console.log('[INFO] got request to create new group.');

  try {
    const body = await request.json();
    const postRequest = body as CreateGroupRequest;
    const newGroup = mapper.toDomainFromCreateRequest(postRequest)
    const createdGroup = await groupsService.createGroup(newGroup);
    const response = mapper.toResponse(createdGroup);

    return NextResponse.json(response, { status: 201 });

  } catch (error: any) {
    return handleApiError(error);
  }
}