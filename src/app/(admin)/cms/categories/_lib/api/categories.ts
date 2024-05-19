'use server'
import prisma from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const categoryInclude = {
  Main_category: { select: { name: true, slug: true, id: true } },
  sub_categories: {
    select: { name: true, slug: true, id: true },
    orderBy: { name: 'asc' }
  },
  products: {
    select: { name: true, slug: true, id: true },
    orderBy: { name: 'asc' }
  }
} satisfies Prisma.CategoryInclude

export type ResCategory = Prisma.CategoryGetPayload<{
  include: typeof categoryInclude
}> & {
  nameMainCategory?: string

  createdAtFormatted?: string
  updatedAtFormatted?: string
}
export const getCategoriesAdmin = async (): Promise<ResCategory[]> => {
  const res = await prisma.category.findMany({
    include: categoryInclude,
    orderBy: { name: 'asc' }
  })
  const categories: ResCategory[] = res.map(category => {
    return {
      ...category,
      nameMainCategory: category.Main_category?.name,
      createdAtFormatted: formatDate(category.createdAt),
      updatedAtFormatted: formatDate(category.updatedAt)
    }
  })

  return categories
}
export const getCategoryBySlug = async (slug: string) => {
  const res = await prisma.category.findUnique({
    where: {
      slug
    },
    include: categoryInclude
  })
  return res
}
export const getCategoryByName = async (name: string) => {
  const res = await prisma.category.findUnique({
    where: {
      name
    }
  })
  return res
}
export const createCategory = async ({
  name,
  slug
}: {
  name: string
  slug: string
}) => {
  const res = await prisma.category.create({
    data: {
      name,
      slug
    }
  })
  revalidatePath('/', 'layout')
  return res
}
export const deleteCategories = async (ids: string[]) => {
  await prisma.category.deleteMany({
    where: {
      id: {
        in: ids
      }
    }
  })
  revalidatePath('/', 'layout')
}
