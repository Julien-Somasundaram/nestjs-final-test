import { Injectable, NotImplementedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Task, Prisma } from '@prisma/client';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) { }

    async addTask(name: string, userId: string, priority: number): Promise<Task> {
        const data: Prisma.TaskCreateInput = {
            name,
            userId: userId.toString(),  
            priority
        };
        return this.prisma.task.create({ data });
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
