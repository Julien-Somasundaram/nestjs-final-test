import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async addUser(email: string): Promise<User> {
        const userExists = await this.prisma.user.findUnique({ where: { email } });
        if (userExists) {
            throw new HttpException('User already exists', HttpStatus.CONFLICT);
        }
        return this.prisma.user.create({ data: { email } });
    }

    async getUsers(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async getUser(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async resetData(): Promise<void> {
        await this.prisma.task.deleteMany(); 
        await this.prisma.user.deleteMany(); 
    }
}
