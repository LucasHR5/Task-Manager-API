import { Prisma } from "@prisma/client";
import { prisma } from "../prismasetup/prisma";

export class TodoRepository {
    async CreateTask(taskData: Prisma.TodoCreateInput) {
        const result = await prisma.todo.create({
            data: taskData
        });
        
        return result;
    }
}