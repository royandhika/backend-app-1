/*
  Warnings:

  - You are about to drop the column `fullname` on the `profiles` table. All the data in the column will be lost.
  - Added the required column `role` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `profiles` DROP COLUMN `fullname`,
    ADD COLUMN `avatar` VARCHAR(250) NULL,
    ADD COLUMN `birthdate` DATETIME NULL,
    ADD COLUMN `country` VARCHAR(50) NULL,
    ADD COLUMN `firstname` VARCHAR(50) NULL,
    ADD COLUMN `gender` TINYINT NULL,
    ADD COLUMN `lastname` VARCHAR(50) NULL,
    ADD COLUMN `role` VARCHAR(10) NOT NULL;
