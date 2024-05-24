import { Body, Controller, Get, Post,Param, HttpCode } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task, Prisma } from '@prisma/client';
import { parse } from 'path';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    addTask(@Body() taskData: { name: string, userId: string, priority: string }): Promise<Task> {
        if (!this.isValidname(taskData.name)) {
            throw new HttpException('Invalid task name', HttpStatus.BAD_REQUEST);
        }
        if (!this.isValiduserId(parseInt(taskData.userId))) {
            throw new HttpException('Invalid userId', HttpStatus.BAD_REQUEST);
        }
        if (!this.isValidpriority(parseInt(taskData.priority))) {
            throw new HttpException('Invalid priority', HttpStatus.BAD_REQUEST);
        }
        return this.taskService.addTask(taskData.name, parseInt(taskData.userId), parseInt(taskData.priority));
    }
    @Get('user/:userId')
    @HttpCode(HttpStatus.OK)
    getUserTasks(@Param('userId') userId: string): Promise<Task[]> {
        if (!this.isValiduserId(parseInt(userId))) {
            throw new HttpException('Invalid userId', HttpStatus.BAD_REQUEST);
        }
        return this.taskService.getUserTasks(parseInt(userId));
    }

    @Get('/:name')
    @HttpCode(HttpStatus.OK)
    getTaskByName(@Param('name') name: string): Promise<Task> {
        if (!this.isValidname(name)) {
            throw new HttpException('Invalid task name', HttpStatus.BAD_REQUEST);
        }
        return this.taskService.getTaskByName(name);
    }

    private isValidname( name: string): boolean {
        const isNameValid = typeof name === 'string' && name.trim().length > 0;

        return isNameValid;
    }
    private isValiduserId(userId: number): boolean {
        const isUserIdValid =  !isNaN(userId) && userId > 0;
        return isUserIdValid;
    }
    private isValidpriority( priority: number ): boolean {
        const isPriorityValid = !isNaN(+priority) && +priority > 0;

        return isPriorityValid;
    }

}

