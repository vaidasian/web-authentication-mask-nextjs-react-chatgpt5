"use server";

import { NextResponse } from "next/server";
import { prisma } from "@/backend/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "All fields are mandatory" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return NextResponse.json({ error: "Login failed" }, { status: 404 });
    }

    if (!user.isActive) {
      return NextResponse.json({ error: "Login failed" }, { status: 403 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: "Login failed" }, { status: 401 });
    }

    const token = user.id.toString();

    return NextResponse.json({ token });
  } catch (err) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
