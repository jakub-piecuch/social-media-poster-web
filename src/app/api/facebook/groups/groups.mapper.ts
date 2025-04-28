import { GroupsException } from "./groups.exception";
import { Group } from "./types/Group";
import { CreateGroupRequest, GroupResponse } from "./types/GroupDto";
import { GroupEntity } from "./types/GroupEntity";

export class GroupsMapper {
  toDomain(entity: GroupEntity): Group {
    return new Group({
      id: entity._id,
      name: entity.name,
      facebookId: entity.facebookId,
      userIds: entity.userIds,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    })
  }

  toDomainFromCreateRequest(request: CreateGroupRequest): Group {
    return new Group({
      name: request.name,
      facebookId: request.facebookId,
      userIds: request.userIds,
    })
  }

  toEntity(group: Group): GroupEntity {
    return new GroupEntity({
      _id: group.id,
      name: group.name,
      facebookId: group.facebookId,
      userIds: group.userIds,
      createdAt: group.createdAt,
      updatedAt: group.updatedAt,
    })
  }

  toResponse(group: Group): GroupResponse {
    if (!group.id || !group.createdAt || !group.updatedAt) {
      throw GroupsException.internalServerError('Group does not contain all required fields for response mapping')
    }

    return {
      id: group.id,
      name: group.name,
      facebookId: group.facebookId,
      userIds: group.userIds,
      createdAt: group.createdAt,
      updatedAt: group.updatedAt
    }
  }
}