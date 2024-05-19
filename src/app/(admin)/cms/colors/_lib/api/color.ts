'use server'
import prisma from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const colorInclude = {
  products: {
    select: { name: true, slug: true, id: true },
    orderBy: { name: 'asc' }
  }
} satisfies Prisma.ColorInclude

export type ResColor = Prisma.ColorGetPayload<{
  include: typeof colorInclude
}> & {
  createdAtFormatted?: string
  updatedAtFormatted?: string
}
export const getColorsAdmin = async (): Promise<ResColor[]> => {
  const res = await prisma.color.findMany({
    include: colorInclude,
    orderBy: { name: 'asc' }
  })
  const colors = res.map(color => {
    return {
      ...color,
      createdAtFormatted: formatDate(color.createdAt),
      updatedAtFormatted: formatDate(color.updatedAt)
    }
  })

  return colors
}
export const getColorBySlug = async (slug: string) => {
  const res = await prisma.color.findUnique({
    where: {
      slug
    },
    include: colorInclude
  })
  return res
}
export const getColorByName = async (name: string) => {
  const res = await prisma.color.findUnique({
    where: {
      name
    }
  })
  return res
}
export const createColor = async ({
  name,
  slug,
  hex
}: {
  name: string
  slug: string
  hex: string
}) => {
  const res = await prisma.color.create({
    data: {
      name,
      slug,
      hex
    }
  })
  revalidatePath('/(admin)/cms', 'layout')
  return res
}
export const updateColor = async ({
  name,
  slug,
  hex
}: {
  name: string
  slug: string
  hex: string
}) => {
  const res = await prisma.color.update({
    where: {
      slug
    },
    data: {
      name,
      slug,
      hex
    }
  })
  revalidatePath('/(admin)/cms', 'layout')
  return res
}
export const deleteColor = async (ids: string[]) => {
  const res = await prisma.color.deleteMany({
    where: {
      id: {
        in: ids
      }
    }
  })
  revalidatePath('/(admin)/cms', 'layout')
}
