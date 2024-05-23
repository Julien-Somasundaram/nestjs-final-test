import { Body, Controller, Get, Param, Post, HttpException, HttpStatus } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '@prisma/client';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    async addTask(@Body() taskData: { name: string, userId: string, priority: string }): Promise<Task> {
        if (!this.isValidTask(taskData)) {
            throw new HttpException('Invalid task data', HttpStatus.BAD_REQUEST);
        }

        const task = await this.taskService.addTask(
            taskData.name,
            taskData.userId,
            parseInt(taskData.priority),
        );

        return task;
    }

    @Get('user/:userId')
    async getUserTasks(@Param('userId') userId: string): Promise<Task[]> {
        if (!userId || isNaN(Number(userId)) || Number(userId) <= 0) {
            throw new HttpException('Invalid userId', HttpStatus.BAD_REQUEST);
        }
        return this.taskService.getUserTasks(userId);
    }

    private isValidTask(taskData: { name: string, userId: string, priority: string }): boolean {
        const { name, userId, priority } = taskData;
        const isNameValid = typeof name === 'string' && name.trim().length > 0;
        const isUserIdValid = typeof userId === 'string' && userId.trim().length > 0 && !isNaN(Number(userId));
        const isPriorityValid = !isNaN(parseInt(priority)) && parseInt(priority) > 0;

        return isNameValid && isUserIdValid && isPriorityValid;
    }
}
