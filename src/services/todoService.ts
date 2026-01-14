import { Prisma } from "@prisma/client";
import { TodoRepository } from "../repositories/todoRepositories";

const todoRepository = new TodoRepository

export class TodoService {

    async createTask(taskData: Prisma.TodoCreateInput) {
        if(!taskData){
            throw new Error("Dados inválidos para  a Tarefa");
        }
        return todoRepository.CreateTask(taskData)
    }
}