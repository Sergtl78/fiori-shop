/*
  Warnings:

  - You are about to drop the column `price` on the `Cart_item` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Cart_item` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the `Colection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ColectionToProduct` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[order]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[order]` on the table `Color` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[order]` on the table `Main_category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[order]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[order]` on the table `Sub_category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[order]` on the table `Vendor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `priceCartItem` to the `Cart_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantityProduct` to the `Cart_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Colection" DROP CONSTRAINT "Colection_imageId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_userId_fkey";

-- DropForeignKey
ALTER TABLE "_ColectionToProduct" DROP CONSTRAINT "_ColectionToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_ColectionToProduct" DROP CONSTRAINT "_ColectionToProduct_B_fkey";

-- DropIndex
DROP INDEX "Image_userId_key";

-- AlterTable
ALTER TABLE "Cart_item" DROP COLUMN "price",
DROP COLUMN "quantity",
ADD COLUMN     "priceCartItem" INTEGER NOT NULL,
ADD COLUMN     "quantityProduct" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "order" TEXT;

-- AlterTable
ALTER TABLE "Color" ADD COLUMN     "order" TEXT;

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Main_category" ADD COLUMN     "order" TEXT;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "order" TEXT;

-- AlterTable
ALTER TABLE "Sub_category" ADD COLUMN     "order" TEXT;

-- AlterTable
ALTER TABLE "Vendor" ADD COLUMN     "order" TEXT;

-- DropTable
DROP TABLE "Colection";

-- DropTable
DROP TABLE "_ColectionToProduct";

-- CreateTable
CREATE TABLE "Collection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "order" TEXT,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "discount" INTEGER,
    "icon" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CollectionToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Collection_name_key" ON "Collection"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_slug_key" ON "Collection"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_order_key" ON "Collection"("order");

-- CreateIndex
CREATE UNIQUE INDEX "_CollectionToProduct_AB_unique" ON "_CollectionToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CollectionToProduct_B_index" ON "_CollectionToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Category_order_key" ON "Category"("order");

-- CreateIndex
CREATE UNIQUE INDEX "Color_order_key" ON "Color"("order");

-- CreateIndex
CREATE UNIQUE INDEX "Image_name_key" ON "Image"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Main_category_order_key" ON "Main_category"("order");

-- CreateIndex
CREATE UNIQUE INDEX "Product_order_key" ON "Product"("order");

-- CreateIndex
CREATE UNIQUE INDEX "Sub_category_order_key" ON "Sub_category"("order");

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_order_key" ON "Vendor"("order");

-- AddForeignKey
ALTER TABLE "Cart_item" ADD CONSTRAINT "Cart_item_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionToProduct" ADD CONSTRAINT "_CollectionToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionToProduct" ADD CONSTRAINT "_CollectionToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
