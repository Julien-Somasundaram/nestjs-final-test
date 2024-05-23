import { Body, Controller, Get, Post,HttpException,HttpStatus, HttpCode, Param} from '@nestjs/common';
import { UserService } from './user.service';
import {User, Prisma} from '@prisma/client';


@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}


    @Get()
    getUsers():  Promise<User[]>{
        return this.userService.getUsers();
    }
    @Post()
    @HttpCode(201)
    addUser(@Body() userData:Prisma.UserCreateInput): Promise<User>{
        console.log(userData);
        if (!this.checkUsermail(userData.email)){
            throw new HttpException('Invalid email',HttpStatus.BAD_REQUEST);
        }
        
        return this.userService.addUser(userData.email);
    
    }
    @Get("/:email")
    @HttpCode(201)
    getUser(@Param('email') email:string): Promise<User>{
        return this.userService.getUser(email);
    
    }



    private checkUsermail(email: string): boolean {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}
