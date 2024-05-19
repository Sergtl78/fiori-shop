'use server'
import prisma from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const main_categoryInclude = {
  categories: {
    select: { name: true, slug: true, id: true },
    orderBy: { name: 'asc' }
  },
  sub_categories: {
    select: { name: true, slug: true, id: true },
    orderBy: { name: 'asc' }
  },
  products: {
    select: { name: true, slug: true, id: true },
    orderBy: { name: 'asc' }
  }
} satisfies Prisma.Main_categoryInclude

export type ResMain_category = Prisma.Main_categoryGetPayload<{
  include: typeof main_categoryInclude
}> & {
  createdAtFormatted?: string
  updatedAtFormatted?: string
}
export const getMainCategoriesAdmin = async (): Promise<ResMain_category[]> => {
  const res = await prisma.main_category.findMany({
    include: main_categoryInclude,
    orderBy: { name: 'asc' }
  })
  const mainCategories = res.map(main_category => {
    return {
      ...main_category,
      createdAtFormatted: formatDate(main_category.createdAt),
      updatedAtFormatted: formatDate(main_category.updatedAt)
    }
  })
  return mainCategories
}

export const getMainCategoryBySlug = async (slug: string) => {
  const res = await prisma.main_category.findUnique({
    where: {
      slug
    },
    include: main_categoryInclude
  })
  return res
}
export const getMainCategoryByName = async (name: string) => {
  const res = await prisma.main_category.findUnique({
    where: {
      name
    }
  })
  return res
}

export const createMainCategory = async ({
  name,
  slug
}: {
  name: string
  slug: string
}) => {
  const res = await prisma.main_category.create({
    data: {
      name,
      slug
    }
  })
  revalidatePath('/', 'layout')
  return res
}
export const deleteMainCategories = async (ids: string[]) => {
  await prisma.main_category.deleteMany({
    where: {
      id: {
        in: ids
      }
    }
  })
  revalidatePath('/', 'layout')
}
