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
  const facebookId = body.facebookId;
  const { id }  = await params;
  console.log('[INFO] got request to update group\'s facebookId by id.', id);
  
  try {
    const group = await groupsService.updateFacebookIdByGroupId(id, facebookId);
    const response = mapper.toResponse(group);

    return NextResponse.json(response, { status: 200 });

  } catch (error: any) {
    return handleApiError(error);
  }
}