import { TodoController } from "../controllers/todoController";
import { Router } from "express";

const todoRoutes = Router();
const controller = new TodoController();

todoRoutes.post("/todos", controller.createTask);
todoRoutes.get("/todos", controller.listAllTasks);
todoRoutes.put("/todos/:id", controller.updateTask);
todoRoutes.delete("/todos/:id", controller.deleteTask);

export { todoRoutes }