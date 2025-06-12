/*
  Warnings:

  - Made the column `brand` on table `vehicle` required. This step will fail if there are existing NULL values in that column.
  - Made the column `company` on table `vehicle` required. This step will fail if there are existing NULL values in that column.
  - Made the column `type` on table `vehicle` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `location` ADD COLUMN `city` VARCHAR(191) NULL,
    ADD COLUMN `state` VARCHAR(191) NULL,
    ADD COLUMN `streetName` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `vehicle` MODIFY `brand` VARCHAR(191) NOT NULL,
    MODIFY `company` VARCHAR(191) NOT NULL,
    MODIFY `type` VARCHAR(191) NOT NULL;
