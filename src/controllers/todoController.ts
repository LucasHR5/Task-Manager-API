import { Request, Response } from "express";
import { prisma } from "../prismasetup/prisma";
import { TodoService } from "../services/todoService";

const todoService = new TodoService
export class TodoController {
    async createTask(req: Request, res: Response) {
        const { title, category, isCompleted } = req.body;

        if (!title || typeof title != "string" || title.trim() === "") {
            return res.status(400).json({ message: `O campo title é obrigatório.` });
        }

        if(!category || typeof category != "string" || category.trim() ==="") {
            return res.status(400).json({ message: `O campo category é obrigatório`});
        }

        if(typeof isCompleted != "boolean") {
            return res.status(400).json({message: `o campo isCompleted precisa ser do tipo Boolean`});
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
            res.status(500).json({ message: `Ocorreu um erro interno ao criar a tarefa` })
        }
    }

    async listAllTasks(req: Request, res: Response) {

        try {
            const result = await prisma.todo.findMany();
            return res.json(result);
        } catch (error) {
            res.status(500).json({ message: `Ocorreu um erro interno ao listar as tarefas` })
        }
    }

    async updateTask(req: Request, res: Response) {
        const { id } = req.params;
        const { title, isCompleted } = req.body;

        if(title !== undefined && (typeof title !== "string" || title.trim() === "")){
            return res.status(400).json({message: `O campo title não pode ser vazio`});
        }

         if (isCompleted !== undefined && typeof isCompleted !== "boolean") {
            return res.status(400).json({ message: 'O campo done deve ser um boolean.' });
        }

        const result = await prisma.todo.update({
            where: { id: Number(id) },
            data: { title, isCompleted },
        });

        return res.json(result);
    }

    async deleteTask(req: Request, res: Response) {
        const { id } = req.params;
        try{
        await prisma.todo.delete({
            where: { id: Number(id) },
        });

        return res.status(204).send();
        } catch(error){
            return res.status(500).json({message: `Erro interno ao excluir uma tarefa`})
        }
    }
}