import { Router } from 'express';
import { todoRoutes } from './todo.routes';

export const router = Router();

router.use(todoRoutes);