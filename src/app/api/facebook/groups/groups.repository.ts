import { GroupEntity } from "./types/GroupEntity";

export class GroupsRepository {
  constructor() {
  }

  async save(entity: GroupEntity): Promise<GroupEntity> {
    try {
      return await GroupEntity.create(entity);
    } catch (err) {
      console.error('GroupsRepository save error:', err);
      throw err;
    }
  }

  async findById(id: string): Promise<GroupEntity | null> {
    return await GroupEntity.findOne({ _id: id });
  }

  async findAll(): Promise<GroupEntity[]> {
    return await GroupEntity.find();
  }

  async updateFacebookIdById(id: string, facebookId: string): Promise<GroupEntity | null> {
    return await GroupEntity.findOneAndUpdate(
      { _id: id},
      { $set: { facebookId: facebookId }},
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