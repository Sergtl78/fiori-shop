import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'

const ordersInclude = {
  Shop: true,
  order_items: { include: { Product: { include: { images: true } } } }
} satisfies Prisma.OrderInclude

export type ResUserOrders = Prisma.OrderGetPayload<{
  include: typeof ordersInclude
}>

type OrdersArgs = {
  userId: string
  page?: number
  pageSize?: number
}
export const getUserOrders = async ({
  userId,
  page = 1,
  pageSize = 2
}: OrdersArgs) => {
  const [orders, orderCount] = await prisma.$transaction([
    prisma.order.findMany({
      where: {
        userId
      },
      include: ordersInclude,
      take: pageSize,
      skip: pageSize * (page - 1)
    }),
    prisma.order.count({ where: { userId } })
  ])

  return { orders, orderCount }
}
