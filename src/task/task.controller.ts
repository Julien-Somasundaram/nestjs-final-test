import { Body, Controller, Get, Post,Param, HttpCode } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '@prisma/client';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    addTask(@Body() taskData: Prisma.TaskCreateInput): Promise<Task> {
        return this.taskService.addTask(taskData.name, taskData.userId, taskData.priority);
    }
    @Get('user/:userId')
    @HttpCode(201)
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
