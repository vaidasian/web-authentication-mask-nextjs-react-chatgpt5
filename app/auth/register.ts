import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { prisma } from "@/backend/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { email, username, password } = req.body;
  if (!email || !username || !password) return res.status(400).json({ message: 'Email & password required' });

  const existingEmail = await prisma.user.findUnique({ where: { email } });
  const existingUser = await prisma.user.findUnique({ where: { username } });
  if (existingEmail || existingUser) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, username, password: hashedPassword } });

  res.status(201).json({ message: 'User created', userId: user.id });
}
