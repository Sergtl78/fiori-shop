'use server'

import { translateStatus } from '@/app/(admin)/_lib/helpers/translate-status'
import prisma from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { Prisma, Status } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { ordersInclude } from './order-include'

type ResOrder = Prisma.OrderGetPayload<{
  include: typeof ordersInclude
}>
export type ResOrderTable = ResOrder & {
  userName?: string
  shopName?: string
  statusOrder?: string
  createdAtFormatted?: string
  updatedAtFormatted?: string
}
export const getOrders = async (): Promise<ResOrderTable[]> => {
  const res = await prisma.order.findMany({
    include: ordersInclude
  })
  const orders: ResOrderTable[] = res.map(order => {
    return {
      ...order,
      userName: order.User?.name + ' ' + order.User?.lastName,
      shopName: order.Shop?.name,
      statusOrder: translateStatus(order.status),

      createdAtFormatted: formatDate(order.createdAt),
      updatedAtFormatted: formatDate(order.updatedAt)
    }
  })
  return orders
}
export const getOrdersAdmin = async () => {
  const res = await prisma.order.findMany({
    select: {
      id: true
    }
  })
  return res
}
export const getOrderById = async (id: string) => {
  const res = await prisma.order.findUnique({
    where: {
      id
    },
    include: ordersInclude
  })
  return res
}
export const deleteOrders = async (ids: string[]) => {
  const res = await prisma.order.deleteMany({
    where: {
      id: {
        in: ids
      }
    }
  })
  revalidatePath('/(admin)/crm', 'layout')
}
export const changeOrderStatus = async ({
  orderId,
  status
}: {
  orderId: string
  status: Status
}) => {
  const res = await prisma.order.update({
    where: {
      id: orderId
    },
    data: {
      status
    }
  })
  revalidatePath('/(admin)/crm', 'layout')
}
export const addOrderStatusCancelled = async (orderId: string) => {
  try {
    const res = await prisma.order.update({
      where: {
        id: orderId
      },
      data: {
        status: 'CANCELLED'
      },
      include: ordersInclude
    })
    for (const item of res.order_items) {
      await prisma.product.update({
        where: {
          id: item.Product?.id
        },
        data: {
          quantity: {
            increment: item.quantityProduct * (item.Product?.min_quantity || 1)
          }
        }
      })
    }
    revalidatePath('/(admin)/crm', 'layout')
  } catch (error) {
    console.log('addStatusCancelled error', error)
  }
}


const userInclude = {
  shops: true
} satisfies Prisma.UserInclude

export type ResUserForOrder = Prisma.UserGetPayload<{
  include: typeof userInclude
}> & {
  fullName: string
}
export const getUsersForOrders = async () => {
  const res = await prisma.user.findMany({
    where: {
      role: 'USER'
    },
    include: userInclude
  })
  return res.map(user => {
    return {
      ...user,
      id: user.id,
      fullName: user.name + ' ' + user.lastName
    }
  })
}
