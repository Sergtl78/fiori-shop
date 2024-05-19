'use server'

import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const order_itemInclude = {
  Product: {
    select: {
      name: true,
      images: true,
      slug: true,
      min_quantity: true,
      id: true,
      price: true,
      Category: { select: { name: true } }
    }
  }
} satisfies Prisma.Order_itemInclude

type ResOrder_item = Prisma.Order_itemGetPayload<{
  include: typeof order_itemInclude
}>
export type ResOrder_itemTable = ResOrder_item & {
  //createdAtFormatted?: string
}
export const getOrder_items = async (): Promise<ResOrder_itemTable[]> => {
  const res = await prisma.order_item.findMany({
    include: order_itemInclude
  })
  const order_items: ResOrder_itemTable[] = res.map(item => {
    return {
      ...item
    }
  })
  return order_items
}

export const deleteOrder_items = async (ids: string[]) => {
  const res = await prisma.order_item.deleteMany({
    where: {
      id: {
        in: ids
      }
    }
  })
  revalidatePath('/(admin)/crm', 'layout')
}
export const getOrderItemsByIdOrder = async (id: string) => {
  const res = await prisma.order_item.findMany({
    where: {
      orderId: id
    },
    include: order_itemInclude
  })
  revalidatePath('/(admin)/crm', 'layout')
  return res
}
