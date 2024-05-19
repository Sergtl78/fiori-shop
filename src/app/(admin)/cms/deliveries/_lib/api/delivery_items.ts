'use server'
import prisma from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const delivery_itemInclude = {
  Product: { include: { images: true } }
} satisfies Prisma.Delivery_itemInclude

export type ResDelivery_item = Prisma.Delivery_itemGetPayload<{
  include: typeof delivery_itemInclude
}> & {
  nameProduct?: string
  imageProduct?: string
  dateDelivery_itemFormatted?: string
  createdAtFormatted?: string
  updatedAtFormatted?: string
}
export const getDelivery_itemsAdmin = async (): Promise<ResDelivery_item[]> => {
  const res = await prisma.delivery_item.findMany({
    include: delivery_itemInclude,
    orderBy: { dateDelivery_item: 'desc' }
  })
  const delivery_items = res.map(delivery_item => {
    return {
      ...delivery_item,
      nameProduct: delivery_item.Product?.name,
      imageProduct: delivery_item.Product?.images[0].url,
      dateDelivery_itemFormatted: formatDate(delivery_item.dateDelivery_item),
      createdAtFormatted: formatDate(delivery_item.createdAt),
      updatedAtFormatted: formatDate(delivery_item.updatedAt)
    }
  })

  return delivery_items
}
export const getAvailabilitiesByIdDelivery = async (
  idDelivery: string
): Promise<ResDelivery_item[]> => {
  const res = await prisma.delivery_item.findMany({
    where: {
      deliveryId: idDelivery
    },
    include: delivery_itemInclude
  })
  const delivery_items = res.map(delivery_item => {
    return {
      ...delivery_item,
      nameProduct: delivery_item.Product?.name,
      imageProduct: delivery_item.Product?.images[0].url,
      dateDelivery_itemFormatted: formatDate(delivery_item.dateDelivery_item),
      createdAtFormatted: formatDate(delivery_item.createdAt),
      updatedAtFormatted: formatDate(delivery_item.updatedAt)
    }
  })
  return delivery_items
}

export const createDelivery_item = async (
  dataDelivery_item: Prisma.Delivery_itemCreateInput
) => {
  const res = await prisma.delivery_item.create({
    data: dataDelivery_item
  })
  revalidatePath('/', 'layout')
  return res
}
export const deleteDelivery_item = async (ids: string[]) => {
  const res = await prisma.delivery_item.deleteMany({
    where: {
      id: {
        in: ids
      }
    }
  })
  revalidatePath('/', 'layout')
}
export const updateDelivery_item = async ({
  id,
  data
}: {
  id: string
  data: Prisma.Delivery_itemUpdateInput
}) => {
  const res = await prisma.delivery_item.update({
    where: {
      id
    },
    data
  })
  revalidatePath('/', 'layout')
  return res
}
