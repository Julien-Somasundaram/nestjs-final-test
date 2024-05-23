import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() body: { email: string }): Promise<{ status: number; user: User }> {
        if (!this.isValidEmail(body.email)) {
            throw new HttpException('Invalid email', HttpStatus.BAD_REQUEST);
        }

        try {
            const user = await this.userService.addUser(body.email);
            return { status: HttpStatus.CREATED, user };
        } catch (error) {
            if (error.status === HttpStatus.CONFLICT) {
                throw new HttpException('User already exists', HttpStatus.CONFLICT);
            }
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}
