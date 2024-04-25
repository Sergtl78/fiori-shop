'use server'
import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export type ResProduct = Prisma.ProductGetPayload<{
  include: { images: true }
}>

export const getMainCategories = async () => {
  const mainCategories = await prisma.main_category.findMany({
    include: {
      categories: {
        include: {
          sub_categories: {
            include: {
              products: { select: { id: true } }
            }
          },
          products: { select: { id: true } }
        }
      },
      products: { select: { id: true } }
    },
    orderBy: {
      id: 'asc'
    }
  })
  return mainCategories
}
