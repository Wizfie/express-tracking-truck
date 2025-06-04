/*
  Warnings:

  - You are about to drop the column `userId` on the `vehicle` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `vehicle` DROP FOREIGN KEY `Vehicle_userId_fkey`;

-- DropIndex
DROP INDEX `Vehicle_userId_fkey` ON `vehicle`;

-- AlterTable
ALTER TABLE `vehicle` DROP COLUMN `userId`;

-- CreateTable
CREATE TABLE `UserVehicle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `vehicleId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserVehicle` ADD CONSTRAINT `UserVehicle_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserVehicle` ADD CONSTRAINT `UserVehicle_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `Vehicle`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
