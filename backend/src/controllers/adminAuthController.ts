import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin';
import z from "zod";

interface User {
  password: string
  adminname: string
  profilePic: string
}

const signupCredentialSyntax = z.object({
  adminname: z.string().min(3).max(30),
  password: z.string().min(5).max(30)
})

const loginCredentialSyntax = z.object({
  adminname: z.string().min(3).max(30),
  password: z.string()
})

export const signup = async (req: Request, res: Response) => {

  try {
    const parsedInput = signupCredentialSyntax.safeParse(req.body)
    if(!parsedInput.success) {
        return res.status(411).json({msg:parsedInput.error})
    }

    const input:User = req.body
    const adminname = input.adminname
    const password = input.password

    const isUserAlreadyPresent = await Admin.findOne({adminname});

    if(isUserAlreadyPresent) {
      return res.status(500).json({message:"Admin with this name already present"})
    }

    const profilePic = `https://avatar.iran.liara.run/public/boy`

    const user = await new Admin<User>({
      adminname: adminname,
      password,
      profilePic: profilePic
    })

    await user.save().then(() => {
        console.log(`New user created successfully: ${user.adminname} `)
    }).catch((e) => {
        return res.status(500).json({message:`${e}`})
    });

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    const payload = { user: { id: user.id} };
    jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.status(201).json({ token });
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: (err as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const parsedInput = loginCredentialSyntax.safeParse(req.body)
    if(!parsedInput.success) {
        return res.status(411).json({msg:parsedInput.error})
    }

    const input:User = req.body;
    const adminname = input.adminname;
    const password = input.password;

    const user = await Admin.findOne({ adminname });
    if (!user) return res.status(400).json({ message: 'Invalid credentials of Admin while loging up' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials by Admin' });

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    const payload = { user: { id: user.id} };
    jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error while logging Admin', error: (err as Error).message });
  }
};
