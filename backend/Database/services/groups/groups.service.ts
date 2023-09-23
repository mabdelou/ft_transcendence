import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Groups from 'Database/entity/Groups.entity';
import { Messages } from 'Database/entity/Message.entity';
import { UserService } from 'src/user/services/user.service';
import { Repository } from 'typeorm';
import { Like } from "typeorm"
import { GroupusersService } from '../groupusers/groupusers.service';
import GroupUsers from 'Database/entity/GroupUsers.entity';


@Injectable()
export class GroupsService {
    constructor(@InjectRepository(Groups) private Groups: Repository<Groups>,
    private readonly user:UserService, private readonly Members:GroupusersService){}
    async create_group(group_info: Groups, id:number)
    {
        const info = this.Groups.create(group_info);
        info.size = 1;
        const user = await this.user.findOne(id);
        const members = new GroupUsers;
        members.role = "owner";
        members.user = user;
        const m = await this.Members.create(members);
        info.members = [m];
        return this.Groups.save(info);
    }
    findOne(groupId:number)
    {
        try
        {
            return this.Groups.findOne({where:{id:groupId},relations: ["members"]})
        }
        catch(error){
            throw new NotFoundException(); 
        }
    }
    findOne_messages(groupId:number)
    {
        try
        {
            return this.Groups.findOne({where:{id:groupId},relations: ["messages"]})
        }
        catch(error){
            throw new NotFoundException(); 
        }
    }
    
    save(group:Groups)
    {
        this.Groups.save(group);
    }
    async search(value:string) 
    {
        return this.Groups.findBy({
             name: Like(`%${value}%`),
             type: "public" || "protected"
        })
    }
    async getPassword(group_id:number)
    {
        const group = await this.Groups.findOne({where:{id:group_id}})
        if (group.type == 'private')
            return group.password;
    }
}
