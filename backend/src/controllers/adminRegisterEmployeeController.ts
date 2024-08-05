import { Request, Response } from 'express';
import z from "zod";

interface InputSyntax {
  username: string
  mobileNumber: number
}

const inputZodValidation = z.object({
  username: z.string().min(3).max(30),
  mobileNumber: z.string()
  .regex(/^[0-9]{10}$/, "Invalid mobile number")
})

export const registerEmployee = async (req: Request, res: Response) => {
  return res.status(200).send("uouou");
};
