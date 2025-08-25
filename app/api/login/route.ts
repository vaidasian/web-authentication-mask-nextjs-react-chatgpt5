"use server";

// app/api/login/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/backend/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Alle Felder müssen ausgefüllt werden" }, { status: 400 });
    }

    // User anhand des Benutzernamens finden
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return NextResponse.json({ error: "Benutzer nicht gefunden" }, { status: 404 });
    }

    if (!user.isActive) {
      return NextResponse.json({ error: "Account nicht aktiviert" }, { status: 403 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: "Falsches Passwort" }, { status: 401 });
    }

    // Token generieren (z.B. JWT oder einfach userId für Test)
    const token = user.id.toString();

    return NextResponse.json({ token });
  } catch (err) {
    return NextResponse.json({ error: "Login fehlgeschlagen" }, { status: 500 });
  }
}
