'use server'

import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const pre_order_itemInclude = {
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
} satisfies Prisma.Pre_order_itemInclude

type ResPre_order_item = Prisma.Pre_order_itemGetPayload<{
  include: typeof pre_order_itemInclude
}>
export type ResPre_order_itemTable = ResPre_order_item & {
  //createdAtFormatted?: string
}
export const getOrder_items = async (): Promise<ResPre_order_itemTable[]> => {
  const res = await prisma.pre_order_item.findMany({
    include: pre_order_itemInclude
  })
  const pre_order_items: ResPre_order_itemTable[] = res.map(item => {
    return {
      ...item
    }
  })
  return pre_order_items
}

export const deletePre_order_items = async (ids: string[]) => {
  const res = await prisma.pre_order_item.deleteMany({
    where: {
      id: {
        in: ids
      }
    }
  })
  revalidatePath('/(admin)/crm', 'layout')
}
export const getPre_order_itemsByIdPre_order = async (id: string) => {
  const res = await prisma.pre_order_item.findMany({
    where: {
      pre_orderId: id
    },
    include: pre_order_itemInclude
  })
  return res
}
