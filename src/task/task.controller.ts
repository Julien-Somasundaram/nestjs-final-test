import { Body, Controller, Get, Post,HttpException,HttpStatus, HttpCode, Param} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task, Prisma } from '@prisma/client';

@Controller()
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    @HttpCode(201)
    addTask(@Body() taskData: Prisma.TaskCreateInput): Promise<Task> {
        if (!this.isValidname(taskData.name)) {
            throw new HttpException('Invalid task name', HttpStatus.BAD_REQUEST);
        }
        if (!this.isValiduserId(taskData.userId)) {
            throw new HttpException('Invalid userId', HttpStatus.BAD_REQUEST);
        }
        if (!this.isValidpriority(taskData.priority)) {
            throw new HttpException('Invalid priority', HttpStatus.BAD_REQUEST);
        }
        return this.taskService.addTask(taskData.name, taskData.userId, taskData.priority);
    }
    @Get('user/:userId')
    @HttpCode(201)
    getUserTasks(@Param('userId') userId: string): Promise<Task[]> {
        if (!this.isValiduserId(userId)) {
            throw new HttpException('Invalid userId', HttpStatus.BAD_REQUEST);
        }
        return this.taskService.getUserTasks(userId);
    }

    private isValidname( name: string): boolean {
        const isNameValid = typeof name === 'string' && name.trim().length > 0;

        return isNameValid;
    }
    private isValiduserId(userId: String): boolean {
        const isUserIdValid = typeof userId === 'string' && userId.trim().length > 0;
        return isUserIdValid;
    }
    private isValidpriority( priority: number ): boolean {
        const isPriorityValid = !isNaN(priority) && priority > 0;

        return isPriorityValid;
    }

}

