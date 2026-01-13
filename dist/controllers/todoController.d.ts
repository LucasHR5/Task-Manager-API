import { Request, Response } from "express";
export declare class TodoController {
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    list(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    update(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    delete(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=todoController.d.ts.map