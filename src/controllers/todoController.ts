import { Request, Response } from "express";
import { prisma } from "../prismasetup/prisma";

export class TodoController {
    async createTask(req: Request, res: Response) {
        const { title, category, isCompleted } = req.body;

        if (!title || typeof title != "string" || title.trim() === "") {
            return res.status(400).json({ message: `O campo title é obrigatório.` });
        }

        try {
            const task = await prisma.todo.create({
                data: { title, category, isCompleted },
            });
            return res.status(201).json(task);
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