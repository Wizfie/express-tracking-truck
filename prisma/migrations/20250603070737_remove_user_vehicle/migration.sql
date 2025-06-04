/*
  Warnings:

  - You are about to drop the `uservehicle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `uservehicle` DROP FOREIGN KEY `UserVehicle_userId_fkey`;

-- DropForeignKey
ALTER TABLE `uservehicle` DROP FOREIGN KEY `UserVehicle_vehicleId_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `company` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `uservehicle`;
