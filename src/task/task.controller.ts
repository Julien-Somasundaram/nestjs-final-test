import { Body, Controller, Get, Post,Param } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task, Prisma } from '@prisma/client';

@Controller()
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    addTask(@Body() taskData: Prisma.TaskCreateInput): Promise<Task> {
        return this.taskService.addTask(taskData);
    }
    @Get('user/:userId')
    getUserTasks(@Param('userId') userId: number): Promise<Task[]> {
        if (!userId) {
            throw new Error('Invalid userId');
        }
        if (userId<0) {
            throw new Error('Invalid userId');
        }
        return this.taskService.getUserTasks(userId.toString());
    }

}

