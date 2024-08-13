import { Request, Response } from 'express';

export const employeeTestRoute = async (req: Request, res: Response) => {
    res.send("Employee Controller Working fine")
}

export const employeeId = async (req: Request, res: Response) => {
    const employeeId = req.headers["id"];
    res.send(employeeId);
}