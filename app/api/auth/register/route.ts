"use server";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { prisma } from "@/backend/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, username, password } = await req.json();

    if (!email || !username || !password) {
      return NextResponse.json({ error: "All fields are mandatory" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const activationToken = crypto.randomBytes(32).toString("hex");
    const activationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const _user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        isActive: false,
        activationToken,
        activationExpires,
      },
    });

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const activationLink = `http://localhost:3000/api/activate?token=${activationToken}`;

    await transporter.sendMail({
      from: '"hoggi" <noreply@example.com>',
      to: email,
      subject: "Please activate your account",
      html: `<p>Click the link to verify your account:</p><a href="${activationLink}">${activationLink}</a>`,
    });

    return NextResponse.json({ message: "User created, email send" });
  } catch (err) {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
