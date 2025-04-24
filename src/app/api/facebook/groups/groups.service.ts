import { GroupsException } from "./groups.exception";
import { GroupsMapper } from "./groups.mapper";
import { GroupsRepository } from "./groups.repository";
import { Group } from "./types/Group";

export class GroupsService {
  private groupsRespository: GroupsRepository
  private mapper: GroupsMapper;

  constructor() {
    this.groupsRespository = new GroupsRepository();
    this.mapper = new GroupsMapper();
  }

  async createGroup(group: Group): Promise<Group> {
    console.log('[INFO] Creating new Group with url:', { userId: group.url })

    const entity = this.mapper.toEntity(group);
    const createdGroup = await this.groupsRespository.save(entity);

    return this.mapper.toDomain(createdGroup);
  }
  async findGroupById(id: string): Promise<Group> {
    console.log('[INFO] Find group by id: ', id)
    
    const group = await this.groupsRespository.findById(id);

    if (!group) {
      throw GroupsException.notFound();
    }

    return this.mapper.toDomain(group);
  }
  async updateUrlByGroupId(id: string, url: string): Promise<Group> {
    console.log('[INFO] Updating url of group: ', id)

    const updatedGroup = await this.groupsRespository.updateUrlById(id, url);
    
    if (!updatedGroup) {
      throw GroupsException.notFound();
    }

    return this.mapper.toDomain(updatedGroup);
  }

  async addUserIdByGroupid(id: string, userId: string): Promise<Group> {
    console.log('[INFO] adding userId to userIds of group: ', id)
    
    const group = await this.findGroupById(id)

    if (group.userIds.includes(userId)) {
      throw GroupsException.badRequest('User is already added to the group.')
    }

    const updatedGroup = await this.groupsRespository.addUserIdById(id, userId);
  
    if (!updatedGroup) {
      throw GroupsException.notFound();
    }

    return this.mapper.toDomain(updatedGroup);
  }
}