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
      return NextResponse.json({ error: "Alle Felder müssen ausgefüllt werden" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email ist bereits vergeben" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Aktivierungs-Token generieren
    const activationToken = crypto.randomBytes(32).toString("hex");
    const activationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h gültig

    // User erstellen
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        isActive: false,
        activationToken,
        activationExpires,
      },
    });

    // E-Mail senden
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // TLS über STARTTLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const activationLink = `http://localhost:3000/api/activate?token=${activationToken}`;

    await transporter.sendMail({
      from: '"hoggi" <noreply@example.com>',
      to: email,
      subject: "Bitte aktiviere deinen Account",
      html: `<p>Klicke auf den Link, um deinen Account zu aktivieren:</p><a href="${activationLink}">${activationLink}</a>`,
    });

    return NextResponse.json({ message: "User erstellt, E-Mail gesendet" });
  } catch (err) {
    return NextResponse.json({ error: "Registrierung fehlgeschlagen" }, { status: 500 });
  }
}
