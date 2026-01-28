import { Request, Response } from "express";
import { TodoService } from "../services/todoService";
import { CreateTaskDTO } from "../dtos/createTaskDto";
import { UpdateTaskDTO } from "../dtos/updateTask.dto";

const todoService = new TodoService
export class TodoController {
    async createTask(req: Request, res: Response): Promise<Response> {
        const taskData: CreateTaskDTO = req.body;

        if (!taskData.title || typeof taskData.title != "string" || taskData.title.trim() === "") {
            return res.status(400).json({ message: `O campo title é obrigatório.` });
        }

        if (!taskData.category || typeof taskData.category != "string" || taskData.category.trim() === "") {
            return res.status(400).json({ message: `O campo category é obrigatório` });
        }

        if (typeof taskData.isCompleted != "boolean") {
            return res.status(400).json({ message: `o campo isCompleted precisa ser do tipo Boolean` });
        }

        try {
            const taskCreated = await todoService.createTask(taskData)
            return res.status(201).json(taskCreated);
        } catch (error) {
            return res.status(500).json({ message: `Ocorreu um erro interno ao criar a tarefa` })
        }
    }

    async listAllTasks(res: Response): Promise<Response> {

        try {
            const result = await todoService.listAllTasks();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: (error as Error).message
            });
        }
    }

    async updateTask(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number.parseInt(req.params.id, 10);
            const updateTaskData: UpdateTaskDTO = req.body

            if (updateTaskData.title !== undefined && (typeof updateTaskData.title !== "string" || updateTaskData.title.trim() === "")) {
                return res.status(400).json({ message: `O campo title não pode ser vazio` });
            }

            if (updateTaskData.isCompleted !== undefined && typeof updateTaskData.isCompleted !== "boolean") {
                return res.status(400).json({ message: 'O campo done deve ser um boolean.' });
            }

            const result = await todoService.updateTask(id, updateTaskData);
            return res.status(200).json(result);

        } catch (error) {
            return res.status(500).json({
                message: (error as Error).message
            });
        }
    }

    async deleteTask(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number.parseInt(req.params.id, 10);
            const taskDeleted = await todoService.deleteTask(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({
                message: (error as Error).message
            })
        }
    }
}