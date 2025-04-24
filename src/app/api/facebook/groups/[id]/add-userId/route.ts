import { NextRequest, NextResponse } from "next/server";
import { GroupResponse } from "../../types/GroupDto";
import { ErrorDetails, handleApiError } from "@/errors/error";
import { GroupsService } from "../../groups.service";
import { GroupsMapper } from "../../groups.mapper";

const groupsService = new GroupsService();
const mapper = new GroupsMapper();

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string }}
): Promise<NextResponse<GroupResponse | ErrorDetails>> {
  const body = await request.json();
  const userId = body.userId;
  const { id }  = await params;
  console.log('[INFO] got request to add userid to group', id);
  
  try {
    const group = await groupsService.addUserIdByGroupid(id, userId);
    const response = mapper.toResponse(group);

    return NextResponse.json(response, { status: 200 });

  } catch (error: any) {
    return handleApiError(error);
  }
}