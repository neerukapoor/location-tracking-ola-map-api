import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import z from "zod";
import Employee from '../models/Employee';

interface User {
  password: string
  uniqueId: string
}

const loginCredentialSyntax = z.object({
    uniqueId: z.string().min(3).max(30),
    password: z.string()
})

export const login = async (req: Request, res: Response) => {
  try {
    const parsedInput = loginCredentialSyntax.safeParse(req.body)
    if(!parsedInput.success) {
        return res.status(411).json({msg:parsedInput.error})
    }

    const input:User = req.body;
    const uniqueId = input.uniqueId;
    const password = input.password;

    const employee = await Employee.findOne({ uniqueId, password });
    if (!employee) return res.status(400).json({ message: 'Invalid Id or password by Employee' });

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    const payload = { employee: { id: employee.id} };
    jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error while logging Employee', error: (err as Error).message });
  }
};
