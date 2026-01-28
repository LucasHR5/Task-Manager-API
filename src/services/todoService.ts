import { Prisma } from "@prisma/client";
import { TodoRepository } from "../repositories/todoRepositories";
import { CreateTaskDTO } from "../dtos/createTaskDto";
import { UpdateTaskDTO } from "../dtos/updateTask.dto";

const todoRepository = new TodoRepository

export class TodoService {

    async createTask(taskData: CreateTaskDTO) {
        if(!taskData){
            throw new Error("Dados inválidos para  a Tarefa");
        }
        return todoRepository.createTask(taskData)
    }

    async listAllTasks() {
        return await todoRepository.listAllTasks();
    }

    async updateTask(id: number, taskData: UpdateTaskDTO) {
        return await todoRepository.updateTask(id, taskData);
    }

    async deleteTask(id: number) {
        return await todoRepository.deleteTask(id);
    }
}