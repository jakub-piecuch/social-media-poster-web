import { GroupEntity } from "./types/GroupEntity";

export class GroupsRepository {
  constructor() {
  }

  async save(entity: GroupEntity): Promise<GroupEntity> {
    return await GroupEntity.create(entity);
  }

  async findById(id: string): Promise<GroupEntity | null> {
    return await GroupEntity.findOne({ _id: id });
  }

  async updateUrlById(id: string, url: string): Promise<GroupEntity | null> {
    return await GroupEntity.findOneAndUpdate(
      { _id: id},
      { $set: { url: url }},
      { new: true, runValidators: true }  
    )
  }

  async addUserIdById(id: string, userId: string): Promise<GroupEntity | null> {
    return await GroupEntity.findOneAndUpdate(
      { _id: id},
      { $push: { userIds: userId } },
      { new: true, runValidators: true }  
    )
  }
}