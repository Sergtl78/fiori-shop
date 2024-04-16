/*
  Warnings:

  - You are about to drop the column `colectionId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_colectionId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "colectionId";

-- CreateTable
CREATE TABLE "_ColectionToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ColectionToProduct_AB_unique" ON "_ColectionToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_ColectionToProduct_B_index" ON "_ColectionToProduct"("B");

-- AddForeignKey
ALTER TABLE "_ColectionToProduct" ADD CONSTRAINT "_ColectionToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Colection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ColectionToProduct" ADD CONSTRAINT "_ColectionToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
