import { Injectable, NotImplementedException } from '@nestjs/common';
import { PrismaService } from './../../prisma/prisma.service';
import { Task, Prisma } from '@prisma/client';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) {}


    addTask(data: Prisma.TaskCreateInput): Promise<Task> {
        return this.prisma.task.create({ data });
    }

    getTaskByName(name: string): Promise<unknown> {
        throw new NotImplementedException();
    }

    getUserTasks(userId: string): Promise<Task[]> {
        return this.prisma.task.findMany({ where: { userId } });
    }

    resetData(): Promise<void> {
        throw new NotImplementedException();
    }
}
