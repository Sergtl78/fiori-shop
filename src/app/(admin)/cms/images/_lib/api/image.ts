'use server'
import prisma from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { Image, Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { deleteImagesInBucket } from './actions-multi'

const imageInclude = {
  Product: {
    select: { name: true, slug: true, id: true }
  }
} satisfies Prisma.ImageInclude

export type ResImage = Prisma.ImageGetPayload<{
  include: typeof imageInclude
}> & {
  productName?: string
  createdAtFormatted?: string
  updatedAtFormatted?: string
}
export const getImagesAdmin = async (): Promise<ResImage[]> => {
  const res = await prisma.image.findMany({
    include: imageInclude,
    orderBy: { name: 'asc' }
  })
  const images = res.map(image => {
    return {
      ...image,
      productName: image.Product?.name,
      createdAtFormatted: formatDate(image.createdAt),
      updatedAtFormatted: formatDate(image.updatedAt)
    }
  })

  return images
}

export type ResImageNoProduct = Image & {
  createdAtFormatted?: string
  updatedAtFormatted?: string
}
export const getImagesNoProductAdmin = async (): Promise<
  ResImageNoProduct[]
> => {
  const res = await prisma.image.findMany({
    where: {
      Product: null
    },
    orderBy: { name: 'asc' }
  })
  const images = res.map(image => {
    return {
      ...image,
      //productName: image.Product?.name,
      createdAtFormatted: formatDate(image.createdAt),
      updatedAtFormatted: formatDate(image.updatedAt)
    }
  })
  return images
}
export const getImageById = async (id: string) => {
  const res = await prisma.image.findUnique({
    where: {
      id
    },
    include: imageInclude
  })
  return res
}
export const getImageByName = async (name: string) => {
  const res = await prisma.image.findUnique({
    where: {
      name
    },
    include: imageInclude
  })
  return res
}
export const createImage = async (data: Prisma.ImageCreateInput) => {
  const res = await prisma.image.upsert({
    where: {
      name: data.name
    },
    create: data,
    update: data
  })
  revalidatePath('/(admin)/cms', 'layout')
  return res
}
export const deleteImage = async (ids: string[]) => {
  const images = await prisma.image.findMany({
    where: {
      id: {
        in: ids
      }
    },
    select: { name: true }
  })
  const names = images.map(image => {
    return { Key: `flowers/${image.name}` }
  })

  const res = await Promise.all([
    prisma.image.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    }),
    deleteImagesInBucket(names)
  ])

  revalidatePath('/(admin)/cms', 'layout')
}
