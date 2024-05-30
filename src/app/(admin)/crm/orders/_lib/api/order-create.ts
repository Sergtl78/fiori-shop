'use server'
import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'

type CreateOrderArgs = {
  userId: string
  userShopId: string
  orderItems: {
    quantityProduct: string
    productId: string
  }[]
}

const order_itemInclude = {
  Product: {
    select: {
      name: true,
      slug: true,
      min_quantity: true,
      id: true,
      price: true
    }
  }
} satisfies Prisma.Order_itemInclude

type ResOrder_item = Prisma.Order_itemGetPayload<{
  include: typeof order_itemInclude
}>
export const createOrder = async ({
  orderItems,
  userId,
  userShopId
}: CreateOrderArgs) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: orderItems.map(item => item.productId)
      }
    }
  })
  //1 create orderItems
  const resultOrderItems: {
    priceCartItem: number
    quantityProduct: number
    productId?: string | null
    product_min_quantity?: number
  }[] = orderItems.map(item => {
    const product = products.find(product => product.id === item.productId)
    return {
      quantityProduct: Number(item.quantityProduct),
      productId: item.productId,
      priceCartItem:
        (Number(item.quantityProduct) *
          (product?.price || 0) *
          (product?.min_quantity || 1) *
          (100 - (user?.personalDiscount || 0))) /
        100,
      product_min_quantity: product?.min_quantity
    }
    //include: order_itemInclude
  })
  //check products
  const resultProducts = await Promise.all(
    orderItems.map(async item => {
      const product = products.find(product => product.id === item.productId)
      if (!product) {
        throw new Error('Товар не найден')
      }
      console.log(product?.quantity)

      if (
        product?.quantity <
        Number(item.quantityProduct) * product.min_quantity
      ) {
        throw new Error('Недостаточно' + `${product?.name}` + ' в наличии')
      } else {
        return prisma.product.update({
          where: {
            id: item.productId
          },
          data: {
            quantity: {
              decrement:
                Number(item.quantityProduct) * (product?.min_quantity || 1)
            }
          }
        })
      }
    })
  )
  console.log(resultProducts)

  //3. Create order
  const resOrder = await prisma.order.create({
    data: {
      shopId: userShopId,
      userId,
      order_items: {
        createMany: {
          data: resultOrderItems.map(item => {
            return {
              quantityProduct: item.quantityProduct,
              priceCartItem: item.priceCartItem,
              productId: item.productId
            }
          })
        }
      },
      total_amount: resultOrderItems.reduce((acc, item) => {
        return acc + Number(item.quantityProduct)
      }, 0),
      total_items: resultOrderItems.reduce((acc, item) => {
        return (
          acc + Number(item.quantityProduct) * (item.product_min_quantity || 1)
        )
      }, 0),
      total_prise: resultOrderItems.reduce((acc, item) => {
        return acc + item.priceCartItem
      }, 0)
    }
  })

  revalidatePath('/', 'layout')
}
