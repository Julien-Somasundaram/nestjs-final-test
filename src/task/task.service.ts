import { Injectable, NotImplementedException } from '@nestjs/common';
import { PrismaService } from './../../prisma/prisma.service';
import { Task, Prisma } from '@prisma/client';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) { }


    addTask(name: string, userId: string, priority: number): Promise<Task> {
        return this.prisma.task.create({ data: { name, userId, priority }});
    }

    async getTaskByName(name: string): Promise<Task | null> {
        return this.prisma.task.findFirst({ where: { name } });
    }

    async getUserTasks(userId: string): Promise<Task[]> {
        return this.prisma.task.findMany({ where: { userId: userId.toString() } });  
    }

    resetData(): Promise<void> {
        throw new NotImplementedException();
    }
}
