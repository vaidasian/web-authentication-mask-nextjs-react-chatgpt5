import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail, findUserByName } from '../models/userModel';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  const existingEmail = await findUserByEmail(email);
  const existingUser = await findUserByName(username);
  if (existingEmail || existingUser) return res.status(400).json({ message: 'User already exists' });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await createUser(email, username, passwordHash);
  res.status(201).json({ message: 'User created', userId: user.id });
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await findUserByName(username);
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};
