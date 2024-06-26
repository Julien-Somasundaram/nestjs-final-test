import { Injectable } from '@nestjs/common';
import { Body, Controller, Get, Post,HttpException,HttpStatus} from '@nestjs/common';
import { PrismaService } from './../../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';


@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }


    async addUser(email: string): Promise<User> {
        const userExists = await this.prisma.user.findUnique( { where: { email } });
        if (userExists) {
            throw new HttpException('User already exists', 409);
        }
        const response = await this.prisma.user.create({ data: { email } });    
        if (!response) {
            throw new Error('Failed to save user');
        }
        return response;
    }

    async getUsers(): Promise<User[]> {
        return this.prisma.user.findMany();
    }
    async getUser(email:string): Promise<User> {
        return this.prisma.user.findUnique({where:{email}});
    }

    async resetData(): Promise<void> {
        await this.prisma.user.deleteMany();
        

    }
}
