'use server'
import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'

const productInclude = {
  collections: true,
  images: true,
  Main_category: { select: { slug: true } },
  Category: { select: { slug: true } },
  Sub_category: { select: { slug: true } }
} satisfies Prisma.ProductInclude

export type ResProductBySlug = Prisma.ProductGetPayload<{
  include: typeof productInclude
}>

type GetProductsArgs = {
  main_category_slug?: string
  category_slug?: string
  sub_category_slug?: string
  vendor_slug?: string
  color_slug?: string
  page?: number
  limit?: number
  search?: string
  priceOrder?: 'asc' | 'desc'
}

export const getProducts = async (
  args: GetProductsArgs
): Promise<{ products: ResProductBySlug[]; totalProducts: number }> => {
  const {
    page = 1,
    limit = 10,
    search,
    priceOrder,
    main_category_slug,
    category_slug,
    sub_category_slug,
    vendor_slug,
    color_slug
  } = args || {}

  const vendor_slugArray = vendor_slug?.split(',').map(slug => ({ slug }))
  const color_slugArray = color_slug?.split(',').map(slug => ({ slug }))
  const skip = (page - 1) * limit
  const [products, totalProducts] = await prisma.$transaction([
    prisma.product.findMany({
      include: productInclude,
      where: {
        Main_category: {
          slug: main_category_slug
        },
        Category: {
          slug: category_slug
        },
        Sub_category: {
          slug: sub_category_slug
        },
        Vendor: { OR: vendor_slugArray },
        Color: { OR: color_slugArray },
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

//=====================================

export const getProductBySlug = async (
  slug: string
): Promise<ResProductBySlug | null> => {
  const product = await prisma.product.findFirst({
    where: {
      slug
    },
    include: productInclude
  })
  return product
}

export const productUpdate = async () => {
  const products = await prisma.product.update({
    where: {
      id: '1'
    },
    data: {}
  })
}
