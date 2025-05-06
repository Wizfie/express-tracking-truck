/*
  Warnings:

  - You are about to drop the column `licensePlat` on the `vehicle` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[platNumber]` on the table `Vehicle` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `platNumber` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Vehicle_licensePlat_key` ON `vehicle`;

-- AlterTable
ALTER TABLE `vehicle` DROP COLUMN `licensePlat`,
    ADD COLUMN `platNumber` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Vehicle_platNumber_key` ON `Vehicle`(`platNumber`);
