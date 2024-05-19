'use server'
import prisma from '@/lib/prisma'
import { productInclude, ResProductBySlug } from './result-types'

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
        },
        visible: true
      },

      orderBy: {
        price: priceOrder,
        
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
export const getProductsBySlugCategory = async (slug?: string) => {
  const res = await prisma.product.findMany({
    where: {
      Category: {
        slug
      },
      visible: true
    },
    include: productInclude
  })
  return res
}
