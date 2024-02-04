/*
  Warnings:

  - The `roleName` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "roleName",
ADD COLUMN     "roleName" "Role" NOT NULL DEFAULT 'USER';
