import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Patch } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./createuser.dto";
import { error } from "console";
import { LoginUserDto } from "../login/login.dto";


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
                    error: 'No User found',
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

    @Post('/signup')
    async signup(@Body() createUserDto: CreateUserDto) {
        try {
            await this.userservice.create(createUserDto);
            return { message: 'User successfully registered' };
        } catch (error) {
            throw new HttpException(
                { status: HttpStatus.BAD_REQUEST, error: 'Registration failed please enter correct Information' },
                HttpStatus.BAD_REQUEST,
                { cause: error }
            );
        }
    }

    @Post('/login')
    async login(@Body() loginUserDto: LoginUserDto) {
        try {
            await this.userservice.login(loginUserDto);
            return { message: 'Login Successful'};
        } catch (error) {
            throw new HttpException(
                { status: HttpStatus.UNAUTHORIZED, error: 'Login failed' },
                HttpStatus.UNAUTHORIZED,
                { cause: error }
            );
        }
    }

    @Put('/:id')
    async updateUser(
        @Param('id') id:string,
        @Body() createuser:CreateUserDto,
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
  async deleteUser(@Param('id') id: string) {
    try {
      return await this.userservice.delete(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User can\'t be found',
        },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
}

    @Patch('/username/:username/role')
async updateRoleByUsername(
  @Param('username') username: string,
  @Body() updateUserRoleDto: { role: string }, // Adjust to your DTO
) {
  try {
    const updatedUser = await this.userservice.updateRoleByUsername(username, updateUserRoleDto.role);
    return { role: updatedUser.role }; // Return the updated user role
  } catch (error) {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'Could not update user role',
      },
      HttpStatus.BAD_REQUEST,
      { cause: error },
    );
  }
}

}