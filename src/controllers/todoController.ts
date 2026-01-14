import { Request, Response } from "express";
import { TodoService } from "../services/todoService";

const todoService = new TodoService
export class TodoController {
    async createTask(req: Request, res: Response): Promise<Response> {
        const { title, category, isCompleted } = req.body;

        if (!title || typeof title != "string" || title.trim() === "") {
            return res.status(400).json({ message: `O campo title é obrigatório.` });
        }

        if (!category || typeof category != "string" || category.trim() === "") {
            return res.status(400).json({ message: `O campo category é obrigatório` });
        }

        if (typeof isCompleted != "boolean") {
            return res.status(400).json({ message: `o campo isCompleted precisa ser do tipo Boolean` });
        }

        const taskData = {
            title,
            category,
            isCompleted
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
            const { title, isCompleted } = req.body;

            if (title !== undefined && (typeof title !== "string" || title.trim() === "")) {
                return res.status(400).json({ message: `O campo title não pode ser vazio` });
            }

            if (isCompleted !== undefined && typeof isCompleted !== "boolean") {
                return res.status(400).json({ message: 'O campo done deve ser um boolean.' });
            }

            const taskData = {
                title,
                isCompleted
            }

            const result = await todoService.updateTask(id, taskData);
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