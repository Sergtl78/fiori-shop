'use server'

import { translateStatus } from '@/app/(admin)/_lib/helpers/translate-status'
import prisma from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { Prisma, Status } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const pre_ordersInclude = {
  User: { select: { name: true, lastName: true, id: true } },
  Shop: true,
  pre_order_items: {
    select: {
      Product: {
        select: {
          name: true,
          slug: true,
          min_quantity: true,
          id: true,
          price: true,
          Category: { select: { name: true } }
        }
      },
      Delivery_item: true,
      quantityProduct: true
    }
  }
} satisfies Prisma.Pre_orderInclude

type ResPre_order = Prisma.Pre_orderGetPayload<{
  include: typeof pre_ordersInclude
}>
export type ResPre_orderTable = ResPre_order & {
  userName?: string
  shopName?: string
  statusOrder?: string
  datePre_order?: string
  createdAtFormatted?: string
  updatedAtFormatted?: string
}
export const getPre_orders = async (): Promise<ResPre_orderTable[]> => {
  const res = await prisma.pre_order.findMany({
    include: pre_ordersInclude
  })
  const pre_orders: ResPre_orderTable[] = res.map(order => {
    return {
      ...order,
      userName: order.User?.name + ' ' + order.User?.lastName,
      shopName: order.Shop?.name,
      statusOrder: translateStatus(order.status),
      datePre_order: formatDate(
        order.pre_order_items[0].Delivery_item?.dateDelivery_item
      ),

      createdAtFormatted: formatDate(order.createdAt),
      updatedAtFormatted: formatDate(order.updatedAt)
    }
  })
  return pre_orders
}
export const getPre_ordersAdmin = async () => {
  const res = await prisma.pre_order.findMany({
    select: {
      id: true
    }
  })
  return res
}
export const getPre_orderById = async (id: string) => {
  const res = await prisma.pre_order.findUnique({
    where: {
      id
    },
    include: pre_ordersInclude
  })
  return res
}
export const deletePre_orders = async (ids: string[]) => {
  const res = await prisma.pre_order.deleteMany({
    where: {
      id: {
        in: ids
      }
    }
  })
  revalidatePath('/(admin)/crm', 'layout')
}
export const changePre_orderStatus = async ({
  pre_orderId,
  status
}: {
  pre_orderId: string
  status: Status
}) => {
  const res = await prisma.pre_order.update({
    where: {
      id: pre_orderId
    },
    data: {
      status
    }
  })
  revalidatePath('/(admin)/crm', 'layout')
}
export const addPre_orderStatusCancelled = async (pre_orderId: string) => {
  const res = await prisma.pre_order.update({
    where: {
      id: pre_orderId
    },
    data: {
      status: 'CANCELLED'
    },
    include: pre_ordersInclude
  })
  for (const item of res.pre_order_items) {
    await prisma.delivery_item.update({
      where: {
        id: item.Delivery_item?.id
      },
      data: {
        quantity: {
          increment: item.quantityProduct * (item.Product?.min_quantity || 1)
        }
      }
    })
  }
  revalidatePath('/(admin)/crm', 'layout')
}
