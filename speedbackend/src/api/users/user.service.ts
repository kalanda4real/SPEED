import { Injectable } from "@nestjs/common";
import { User } from "./users.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./createuser.dto";
import { LoginUserDto } from "../login/login.dto";
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";



@Injectable()
export class UserService{
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService  
    ) {}

    test():string {
        return 'user route testing'
    }

    async findAll(): Promise<User[]>{
        return await this.userModel.find().exec();
    }

    async findOne(id:string):Promise<User>{
        return await this.userModel.findById(id).exec();
    }
    async update(id:string, createuser: CreateUserDto)
    {
        return await this.userModel.findByIdAndUpdate(id, CreateUserDto).exec();
    }

    async delete(id: string)
    {
        const deleteUser = await this.userModel.findByIdAndDelete(id).exec();
        return deleteUser;
    }

    async findByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({ email }).exec();
      }
      
      async create(createUserDto: CreateUserDto): Promise<User> {
        // Hash the password before saving the user
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
        const user = new this.userModel({
            ...createUserDto,
            password: hashedPassword
        });
        return await user.save();
    }

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.userModel.findOne({ email }).exec();
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }

    async login(loginUserDto: LoginUserDto): Promise<{ access_token: string }> {
        const user = await this.validateUser(loginUserDto.email, loginUserDto.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Generate JWT
        const payload = { username: user.username, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}