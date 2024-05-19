'use server'
import prisma from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { Delivery_item, Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const deliveryInclude = {
  delivery_items: { include: { Product: true } }
} satisfies Prisma.DeliveryInclude

export type ResDelivery = Prisma.DeliveryGetPayload<{
  include: typeof deliveryInclude
}> & {
  dateDeliveryFormatted?: string
  createdAtFormatted?: string
  updatedAtFormatted?: string
}
export const getDeliveriesAdmin = async (): Promise<ResDelivery[]> => {
  const res = await prisma.delivery.findMany({
    include: deliveryInclude,
    orderBy: { dateDelivery: 'desc' }
  })
  const deliveries = res.map(delivery => {
    return {
      ...delivery,
      dateDeliveryFormatted: formatDate(delivery.dateDelivery),
      createdAtFormatted: formatDate(delivery.createdAt),
      updatedAtFormatted: formatDate(delivery.updatedAt)
    }
  })

  return deliveries
}
export const getDeliveryBySlug = async (slug: string) => {
  const res = await prisma.delivery.findUnique({
    where: {
      slug
    },
    include: deliveryInclude
  })
  return res
}
export const getDeliveryById = async (id: string) => {
  const res = await prisma.delivery.findUnique({
    where: {
      id
    }
  })
  return res
}

export const createDelivery = async ({
  date,
  slug,
  delivery_items
}: {
  date: Date
  slug: string
  delivery_items: Prisma.Delivery_itemCreateInput[]
}) => {
  let resArr = [] as Delivery_item[]

  for (const item of delivery_items) {
    const response = await prisma.delivery_item.create({
      data: { ...item, dateDelivery_item: date }
    })
    resArr.push(response)
  }

  const idsDelivery_items = resArr.map(item => {
    return { id: item.id }
  })
  const res = await prisma.delivery.create({
    data: {
      dateDelivery: new Date(date),
      slug,
      statusDelivery: 'ORDERED',
      delivery_items: {
        connect: idsDelivery_items
      }
    }
  })
  revalidatePath('/', 'layout')
}
export const deleteDelivery = async (ids: string[]) => {
  const res = await prisma.delivery.deleteMany({
    where: {
      id: {
        in: ids
      }
    }
  })
  revalidatePath('/', 'layout')
}
export const getProductsForDelivery = async () => {
  const res = await prisma.product.findMany({
    select: {
      id: true,
      name: true
    }
  })
  return res
}
export const updateDelivery = async ({
  deliveryId,
  dataDelivery
}: {
  deliveryId: string
  dataDelivery: Prisma.DeliveryUpdateInput
}) => {
  const res = await prisma.delivery.update({
    where: {
      id: deliveryId
    },
    data: dataDelivery
  })
  const resAv = await prisma.delivery_item.updateMany({
    where: {
      deliveryId
    },
    data: {
      dateDelivery_item: dataDelivery.dateDelivery
    }
  })
  revalidatePath('/', 'layout')
  return res
}
export const registerDelivery = (deliveryId: string) => {
  return prisma.$transaction(async tx => {
    const delivery = await tx.delivery.findUnique({
      where: {
        id: deliveryId
      },
      include: deliveryInclude
    })
    if (!delivery) {
      throw new Error('Delivery not found')
    }
    await tx.delivery.update({
      where: {
        id: deliveryId
      },
      data: {
        statusDelivery: 'REGISTERED'
      }
    })
    const res = await Promise.all(
      delivery.delivery_items.map(item => {
        return tx.product.update({
          where: {
            id: item.productId ?? undefined
          },
          data: {
            quantity: {
              increment: item.quantity
            },
            price: item.price
          }
        })
      })
    )
    revalidatePath('/', 'layout')
    if (!res || res.length === 0)
      throw new Error('Update product vs delivery register error')
  })
}
