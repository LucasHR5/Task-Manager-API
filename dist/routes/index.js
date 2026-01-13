"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const todo_routes_1 = require("./todo.routes");
exports.router = (0, express_1.Router)();
exports.router.use(todo_routes_1.todoRoutes);
