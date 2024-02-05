/*
  Warnings:

  - You are about to drop the column `defaultBillingAdress` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `defaultShippingAdress` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "defaultBillingAdress",
DROP COLUMN "defaultShippingAdress",
ADD COLUMN     "defaultBillingAddress" INTEGER,
ADD COLUMN     "defaultShippingAddress" INTEGER;
