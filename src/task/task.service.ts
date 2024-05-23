import { Injectable, NotImplementedException } from '@nestjs/common';
import { PrismaService } from './../../prisma/prisma.service';
import { Body, Controller, Get, Post,HttpException,HttpStatus} from '@nestjs/common';
import { Task, Prisma } from '@prisma/client';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) { }


    async addTask(name: string, userId: string, priority: number): Promise<Task> {
        const taskExists = await this.prisma.task.findUnique({
            where: {
              name_userId: {
                name: name,
                userId: userId,
              },
            },
          });
        if (taskExists) {
            throw new HttpException('task already exists', 409);
        }
        const response = this.prisma.task.create({ data: { name, userId, priority }});
        if (!response) {
            throw new HttpException('Failed to save task', HttpStatus.BAD_REQUEST);
        }
        return response;
    }

    async getTaskByName(name: string): Promise<Task | null> {
        return this.prisma.task.findFirst({ where: { name } });
    }

    async getUserTasks(userId: string): Promise<Task[]> {
        return this.prisma.task.findMany({ where: { userId: userId.toString() } });  
    }

    async resetData(): Promise<void> {
        await this.prisma.task.deleteMany();
    }
}
