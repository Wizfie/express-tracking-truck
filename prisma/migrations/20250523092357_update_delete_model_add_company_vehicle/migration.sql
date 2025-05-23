/*
  Warnings:

  - You are about to drop the column `model` on the `vehicle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `trip` ADD COLUMN `soNumber` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `vehicle` DROP COLUMN `model`,
    ADD COLUMN `company` VARCHAR(191) NULL,
    MODIFY `brand` VARCHAR(191) NULL;
