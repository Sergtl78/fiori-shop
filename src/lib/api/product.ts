'use server'
import { Prisma, Product } from '@prisma/client'
import prisma from '../prisma'

export type ResProduct = Prisma.ProductGetPayload<{
  include: { images: true }
}>

type GetProductsArgs = {
  page?: number
  limit?: number
  search?: string
  priceOrder?: 'asc' | 'desc'
}

export const getProducts = async (
  args: GetProductsArgs
): Promise<{ products: ResProduct[]; totalProducts: number }> => {
  const { page = 1, limit = 10, search, priceOrder } = args || {}
  const skip = (page - 1) * limit
  const [products, totalProducts] = await prisma.$transaction([
    prisma.product.findMany({
      include: {
        images: true
      },
      where: {
        name: {
          contains: search
        }
      },
      orderBy: {
        price: priceOrder
      },
      skip,
      take: limit
    }),
    prisma.product.count()
  ])
  return { products, totalProducts }
}

export const getProductById = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id
    }
  })
  return product
}

export const getProductBySku = async (sku: string) => {
  const product = await prisma.product.findUnique({
    where: {
      sku
    }
  })
  return product
}

export const createProduct = async ({
  name,
  sku,
  price,
  description,
  quantity,
  min_quantity,
  growth,
  delivery,
  imageIds,
  main_categoryId,
  categoryId,
  sub_categoryId,
  vendorId,
  colorId,
  collectionIds
}: Product & {
  imageIds: { id: string }[]
  main_categoryId: string
  categoryId?: string
  sub_categoryId?: string
  vendorId: string
  colorId: string
  collectionIds?: { id: string }[]
}) => {
  const product = await prisma.product.create({
    data: {
      name,
      sku,
      price,
      description,
      quantity,
      min_quantity,
      growth,
      delivery,
      images: {
        connect: imageIds
      },
      main_categoryId,
      categoryId,
      sub_categoryId,
      vendorId,
      colorId,
      collections: {
        connect: collectionIds
      }
    }
  })
  return product
}
export const updateProduct = async (id: string, product: Partial<Product>) => {
  const data = await prisma.product.update({
    where: {
      id
    },
    data: {
      ...product
    }
  })
  return data
}

export const deleteProduct = async (id: string) => {
  const product = await prisma.product.delete({
    where: {
      id
    }
  })
  return product
}
