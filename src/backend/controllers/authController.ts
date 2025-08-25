// backend/src/controllers/authController.ts
import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../models/userModel';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const existingUser = await findUserByEmail(email);
  if (existingUser) return res.status(400).json({ message: 'User exists' });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await createUser(email, passwordHash);
  res.status(201).json({ message: 'User created', userId: user.id });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};
