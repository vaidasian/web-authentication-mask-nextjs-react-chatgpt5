"use server";

import { NextResponse } from "next/server";
import { prisma } from "@/backend/lib/prisma";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  if (!token) return NextResponse.json({ error: "Token fehlt" }, { status: 400 });

  const user = await prisma.user.findFirst({ where: { activationToken: token } });

  if (!user) return NextResponse.json({ error: "Ungültiger Token" }, { status: 400 });

  if (user.activationExpires < new Date()) {
    return NextResponse.json({ error: "Token abgelaufen" }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { isActive: true, activationToken: null, activationExpires: null },
  });

  return NextResponse.json({ message: "Account aktiviert! Du kannst dich jetzt einloggen." });
}
