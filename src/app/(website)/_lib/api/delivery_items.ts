import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { productInclude } from './result-types'
const delivery_itemInclude = {
  Product: { include: productInclude }
} satisfies Prisma.Delivery_itemInclude

export type ResDelivery_item = Prisma.Delivery_itemGetPayload<{
  include: typeof delivery_itemInclude
}>
//Нужна ли такая функция
type GetDelivery_itemProps = {
  productId?: string
}
export const getDelivery_itemByProductId = async ({
  productId
}: GetDelivery_itemProps) => {
  const res = await prisma.delivery_item.findMany({
    where: {
      productId
    },
    include: delivery_itemInclude
  })
  return res
}
