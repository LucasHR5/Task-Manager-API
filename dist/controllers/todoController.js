"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
const prisma_1 = require("../prismasetup/prisma");
class TodoController {
    async create(req, res) {
        const { title } = req.body;
        const todo = await prisma_1.prisma.todo.create({
            data: { title },
        });
        return res.status(201).json(todo);
    }
    async list(req, res) {
        const result = await prisma_1.prisma.todo.findMany();
        return res.json(result);
    }
    async update(req, res) {
        const { id } = req.params;
        const { title, done } = req.body;
        const result = await prisma_1.prisma.todo.update({
            where: { id: Number(id) },
            data: { title, done },
        });
        return res.json(result);
    }
    async delete(req, res) {
        const { id } = req.params;
        await prisma_1.prisma.todo.delete({
            where: { id: Number(id) },
        });
        return res.status(204).send();
    }
}
exports.TodoController = TodoController;
