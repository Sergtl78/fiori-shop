'use server'

import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { ordersInclude } from './order-include'

const order_itemInclude = {
  Order: {
    include: {
      User: {
        select: { name: true, lastName: true, id: true, personalDiscount: true }
      }
    }
  },
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

const deleteOrderItem = async (ItemId: string) => {
  const orderItem = await prisma.order_item.findUnique({
    where: {
      id: ItemId
    },
    include: order_itemInclude
  })
  if (!orderItem?.orderId) return
  const res = await prisma.order.update({
    where: {
      id: orderItem?.orderId
    },
    data: {
      total_prise: {
        decrement:
          (orderItem?.Product?.price || 0) *
          (orderItem?.quantityProduct || 1) *
          (orderItem?.Product?.min_quantity || 1)
      },
      total_amount: {
        decrement:
          orderItem?.quantityProduct * (orderItem?.Product?.min_quantity || 1)
      },
      total_items: {
        decrement: orderItem?.quantityProduct
      }
    }
  })
  const delRes = await prisma.order_item.delete({
    where: {
      id: ItemId
    }
  })
  return delRes
}
export const deleteOrder_items = async (ids: string[]) => {
  const res = await Promise.all(ids.map(id => deleteOrderItem(id)))

  revalidatePath('/(admin)/crm', 'layout')
}
export const getOrderItemsByIdOrder = async (id: string) => {
  const res = await prisma.order_item.findMany({
    where: {
      orderId: id
    },
    include: order_itemInclude,
    orderBy: { Product: { name: 'asc' } }
  })
  revalidatePath('/(admin)/crm', 'layout')
  return res
}
export const updateOrderItemCrm = async ({
  itemId,
  quantityItem
}: {
  itemId: string
  quantityItem: number
}) => {
  const orderItem = await prisma.order_item.findUnique({
    where: {
      id: itemId
    },
    include: order_itemInclude
  })

  const updatedOrderItem = await prisma.order_item.update({
    where: {
      id: itemId
    },
    data: {
      quantityProduct: quantityItem,
      priceCartItem:
        (quantityItem *
          (orderItem?.Product?.price || 0) *
          (orderItem?.Product?.min_quantity || 1) *
          (100 - (orderItem?.Order?.User?.personalDiscount || 0))) /
        100
    },
    include: order_itemInclude
  })

  if (!orderItem?.orderId) return

  const order = await prisma.order.findUnique({
    where: {
      id: orderItem?.orderId
    },
    include: ordersInclude
  })
  const resOrder = await prisma.order.update({
    where: {
      id: orderItem?.orderId
    },
    data: {
      total_prise: order?.order_items.reduce(
        (acc, item) => acc + item.priceCartItem,
        0
      ),
      total_amount: order?.order_items.reduce(
        (acc, item) =>
          acc + item.quantityProduct * (item.Product?.min_quantity || 1),
        0
      ),
      total_items: order?.order_items.reduce(
        (acc, item) => acc + item.quantityProduct,
        0
      )
    }
  })

  revalidatePath('/(admin)/crm', 'layout')
}
