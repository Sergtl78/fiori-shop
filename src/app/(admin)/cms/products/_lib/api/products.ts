'use server'
import prisma from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const productInclude = {
  Main_category: { select: { name: true, slug: true } },
  Category: { select: { name: true, slug: true } },
  Sub_category: { select: { name: true, slug: true } },
  Vendor: { select: { name: true, slug: true } },
  Color: { select: { name: true, slug: true, hex: true } },
  collections: { select: { name: true, slug: true }, orderBy: { name: 'asc' } },
  images: true
} satisfies Prisma.ProductInclude

export type ResProducts = Prisma.ProductGetPayload<{
  include: typeof productInclude
}> & {
  nameMainCategory?: string
  nameCategory?: string
  nameSubCategory?: string
  nameVendor?: string
  nameColor?: string
  createdAtFormatted?: string
  updatedAtFormatted?: string
}
export const getProductsAdmin = async (): Promise<ResProducts[]> => {
  const res = await prisma.product.findMany({
    include: productInclude,
    orderBy: { name: 'asc' }
  })
  const products = res.map(product => {
    return {
      ...product,
      nameMainCategory: product.Main_category?.name,
      nameCategory: product.Category?.name,
      nameSubCategory: product.Sub_category?.name,
      nameVendor: product.Vendor?.name,
      nameColor: product.Color?.name,
      createdAtFormatted: formatDate(product.createdAt),
      updatedAtFormatted: formatDate(product.updatedAt)
    }
  })
  return products
}

export type ResProductAdmin = Prisma.ProductGetPayload<{
  include: typeof productInclude
}>
export const getProductBySlug = async (slug: string) => {
  const res = await prisma.product.findUnique({
    where: {
      slug
    },
    include: productInclude
  })
  return res
}
export const getProductByName = async (name: string) => {
  const res = await prisma.product.findUnique({
    where: {
      name
    }
  })
  return res
}
type ImageCreateType = Prisma.ImageCreateInput
export const createProduct = async ({
  name,
  slug,
  description,
  price,
  growth,
  quantity,
  min_quantity
}: {
  name: string
  slug: string
  description: string
  price: number
  growth: number
  quantity: number
  min_quantity: number
}) => {
  const res = await prisma.product.create({
    data: {
      name,
      slug,
      description,
      price,
      growth,
      quantity,
      min_quantity
    }
  })
  revalidatePath('/', 'layout')
  return res
}

type UpdateProduct = Prisma.ProductUpdateInput & {
  slug: string
}
export const updateProduct = async ({
  name,
  slug,
  description,
  price,
  growth,
  quantity,
  min_quantity
}: UpdateProduct) => {
  const res = await prisma.product.update({
    where: {
      slug
    },
    data: {
      name,
      slug,
      description,
      price,
      growth,
      quantity,
      min_quantity
    }
  })
  revalidatePath('/', 'layout')
}
export type IdsType = string[]

export const deleteProducts = async (ids: IdsType) => {
  await prisma.product.deleteMany({
    where: {
      id: {
        in: ids
      }
    }
  })
  revalidatePath('/', 'layout')
}
