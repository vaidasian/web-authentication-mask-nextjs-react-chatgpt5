import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { prisma } from "@/backend/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email & Passwort erforderlich' });

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return res.status(400).json({ message: 'User existiert bereits' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, password: hashedPassword } });

  res.status(201).json({ message: 'User erstellt', userId: user.id });
}
