/*
  Warnings:

  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "activationExpires" TIMESTAMP(3),
ADD COLUMN     "activationToken" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "username" TEXT NOT NULL;
