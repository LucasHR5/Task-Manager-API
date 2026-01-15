import { Prisma } from "@prisma/client";
import { prisma } from "../prismasetup/prisma";
import { CreateTaskDTO } from "../dtos/todo.dto";

export class TodoRepository {
    async createTask(taskData: CreateTaskDTO) {
        const result = await prisma.todo.create({
            data: taskData
        });

        return result;
    }

    async listAllTasks() {
        const result = await prisma.todo.findMany();
        return result;
    }

    async updateTask(id: number, taskData: Partial<Prisma.TodoUpdateInput>) {
        const result = await prisma.todo.update({
            where: { id },
            data: taskData,
        });
        return result;
    }

    async deleteTask(id: number) {
        return await prisma.todo.delete({
            where: { id },
        });
    }
}