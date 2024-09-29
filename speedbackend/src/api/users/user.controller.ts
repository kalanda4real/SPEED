import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateuserDto } from "./createuser.dto";
import { error } from "console";
import { NOTFOUND } from "dns";

@Controller('api/users')
export class UserController{
    constructor(private readonly userservice: UserService){}

    @Get('/test')
    test() {
        return this.userservice.test();
    }

    @Get('/')
    async findAll()
    {
        try{
            return this.userservice.findAll();
        }catch{
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: 'No Books found',
                },
                HttpStatus.NOT_FOUND,
                {cause:error },
            );
        }
    }

    @Get('/:id')
    async findOne(@Param('id') id:string)
    {
        try{
            return this.userservice.findOne(id);
        }catch{
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error:'No User Found',
                },
                HttpStatus.NOT_FOUND,
                {cause:error}
            );
        }
    }

    @Post('/')
    async addUser(@Body() createuser:CreateuserDto)
    {
        try{
            await this.userservice.create(createuser);
            return {message: 'User added to list'};
        }catch{
            throw new HttpException(
                {
                    status:HttpStatus.BAD_REQUEST,
                    error: 'User could be not added',
                },
                HttpStatus.BAD_REQUEST,
                {cause:error},
            );
        }
    }

    @Put('/:id')
    async updateUser(
        @Param('id') id:string,
        @Body() createuser:CreateuserDto,
    ){
        try{
            await this.userservice.update(id, createuser);
            return {message: 'User Added successfully'};
        }catch{
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Was not able to add user',
                },
                HttpStatus.BAD_REQUEST,
                {cause:error},
            );
        }
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id: string){
        try{
            return await await this.userservice.delete(id);
        }catch{
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error:'User cant be found'
                },
                HttpStatus.NOT_FOUND,
                {cause:error},
            );
        }
    }
}