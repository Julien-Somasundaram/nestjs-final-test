import { Injectable, NotImplementedException } from '@nestjs/common';
import { PrismaService } from './../../prisma/prisma.service';
import { Task, Prisma } from '@prisma/client';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) { }


    async addTask(name: string, userId: number, priority: number): Promise<Task> {

        const response = this.prisma.task.create({ data: { name, userId, priority }});
        if (!response) {
            throw new HttpException('Failed to save task', HttpStatus.BAD_REQUEST);
        }
        return response;
    }

    getTaskByName(name: string): Promise<Task> {
        return this.prisma.task.findFirst({ where: { name } });
    }

    getUserTasks(userId: number): Promise<Task[]> {
        return this.prisma.task.findMany({ where: { userId } });
    }

    resetData(): Promise<void> {
        throw new NotImplementedException();
    }
}
