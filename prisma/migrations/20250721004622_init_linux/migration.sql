/*
  Warnings:

  - Made the column `admin` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "email" SET DATA TYPE TEXT,
ALTER COLUMN "pass" DROP NOT NULL,
ALTER COLUMN "pass" SET DATA TYPE TEXT,
ALTER COLUMN "admin" SET NOT NULL;
