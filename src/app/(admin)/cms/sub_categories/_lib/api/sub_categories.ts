'use server'
import prisma from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const sub_categoryInclude = {
  Main_category: { select: { name: true, slug: true, id: true } },
  Category: { select: { name: true, slug: true, id: true } },
  products: {
    select: { name: true, slug: true, id: true },
    orderBy: { name: 'asc' }
  }
} satisfies Prisma.Sub_categoryInclude

export type ResSubCategory = Prisma.Sub_categoryGetPayload<{
  include: typeof sub_categoryInclude
}> & {
  nameMainCategory?: string
  nameCategory?: string

  createdAtFormatted?: string
  updatedAtFormatted?: string
}
export const getSubCategoriesAdmin = async (): Promise<ResSubCategory[]> => {
  const res = await prisma.sub_category.findMany({
    include: sub_categoryInclude,
    orderBy: { name: 'asc' }
  })

  const sub_categories: ResSubCategory[] = res.map(sub_category => {
    return {
      ...sub_category,
      nameMainCategory: sub_category.Main_category?.name,
      nameCategory: sub_category.Category?.name,
      createdAtFormatted: formatDate(sub_category.createdAt),
      updatedAtFormatted: formatDate(sub_category.updatedAt)
    }
  })
  return sub_categories
}
export const getSubCategoryBySlug = async (slug: string) => {
  const res = await prisma.sub_category.findUnique({
    where: {
      slug
    },
    include: sub_categoryInclude
  })
  return res
}
export const getSubCategoryByName = async (name: string) => {
  const res = await prisma.sub_category.findUnique({
    where: {
      name
    }
  })
  return res
}
export const createSubCategory = async ({
  name,
  slug
}: {
  name: string
  slug: string
}) => {
  const res = await prisma.sub_category.create({
    data: {
      name,
      slug
    }
  })
  revalidatePath('/', 'layout')
}
export const deleteSubCategories = async (ids: string[]) => {
  await prisma.sub_category.deleteMany({
    where: {
      id: {
        in: ids
      }
    }
  })
  revalidatePath('/', 'layout')
}
