import { Injectable } from "@nestjs/common";
import { User } from "./users.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateuserDto } from "./createuser.dto";

@Injectable()
export class UserService{
    constructor(@InjectModel(User.name) private userModel: Model<User>){}

    test():string {
        return 'user route testing'
    }

    async findAll(): Promise<User[]>{
        return await this.userModel.find().exec();
    }

    async findOne(id:string):Promise<User>{
        return await this.userModel.findById(id).exec();
    }
    async create(createuser: CreateuserDto)
    {
        return await this.userModel.create(CreateuserDto);
    }
    async update(id:string, createuser: CreateuserDto)
    {
        return await this.userModel.findByIdAndUpdate(id, CreateuserDto).exec();
    }

    async delete(id: string)
    {
        const deleteUser = await this.userModel.findByIdAndDelete(id).exec();
        return deleteUser;
    }
}