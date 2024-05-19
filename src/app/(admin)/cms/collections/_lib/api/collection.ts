'use server'
import prisma from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const collectionInclude = {
  products: {
    select: { name: true, slug: true, id: true },
    orderBy: { name: 'asc' }
  }
} satisfies Prisma.CollectionInclude

export type ResCollection = Prisma.CollectionGetPayload<{
  include: typeof collectionInclude
}> & {
  createdAtFormatted?: string
  updatedAtFormatted?: string
}
export const getCollectionsAdmin = async (): Promise<ResCollection[]> => {
  const res = await prisma.collection.findMany({
    include: collectionInclude,
    orderBy: { name: 'asc' }
  })
  const collections = res.map(collection => {
    return {
      ...collection,
      createdAtFormatted: formatDate(collection.createdAt),
      updatedAtFormatted: formatDate(collection.updatedAt)
    }
  })
  return collections
}
export const getCollectionBySlug = async (slug: string) => {
  const res = await prisma.collection.findUnique({
    where: {
      slug
    },
    include: collectionInclude
  })
  return res
}
export const getCollectionByName = async (name: string) => {
  const res = await prisma.collection.findUnique({
    where: {
      name
    }
  })
  return res
}
export const createCollection = async ({
  name,
  slug,
  discount
}: Prisma.CollectionCreateInput) => {
  const res = await prisma.collection.create({
    data: {
      name,
      slug,
      discount
    }
  })
  revalidatePath('/', 'layout')
  return res
}
export const updateCollection = async ({
  name,
  slug,
  discount,
  icon
}: {
  name: string
  slug: string
  discount: number
  icon?: string
}) => {
  const res = await prisma.collection.update({
    where: {
      slug
    },
    data: {
      name,
      slug,
      discount,
      icon
    }
  })
  revalidatePath('/', 'layout')
  return res
}
export const deleteCollections = async (ids: string[]) => {
  const res = await prisma.collection.deleteMany({
    where: {
      id: {
        in: ids
      }
    }
  })
  revalidatePath('/', 'layout')
}
export const updateIconCollection = async ({
  id,
  icon
}: {
  id: string
  icon: string
}) => {
  const res = await prisma.collection.update({
    where: {
      id
    },
    data: {
      icon
    }
  })
  revalidatePath('/', 'layout')
  return res
}
