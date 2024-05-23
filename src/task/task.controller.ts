import { Body, Controller, Get, Post,Param } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '@prisma/client';

@Controller('task')
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
