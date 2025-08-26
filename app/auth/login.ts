import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from "@/backend/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Email & password required' });

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return res.status(400).json({ message: 'No valid input' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: 'No valid data' });

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ token });
}
