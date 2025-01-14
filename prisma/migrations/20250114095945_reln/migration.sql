/*
  Warnings:

  - Made the column `code` on table `ClickAnalytics` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ClickAnalytics" ALTER COLUMN "code" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ClickAnalytics" ADD CONSTRAINT "ClickAnalytics_code_fkey" FOREIGN KEY ("code") REFERENCES "links"("short_code") ON DELETE RESTRICT ON UPDATE CASCADE;
