'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { CartItem } from '../state/cart-state'

export type CreateOderType = {
  total_amount: number
  total_items: number
  total_prise: number
  cartItems: CartItem[]
  dateOrder: string
  shopId?: string
}
type CreteOrderArgs = {
  orders: CreateOderType[]
  userId: string
}

export const createOrders = async ({ orders, userId }: CreteOrderArgs) => {
  const ordersNow = orders.filter(order => order.dateOrder === 'сейчас')
  for (let i = 0; i < ordersNow.length; i++) {
    const resOrder = await prisma.order.create({
      data: {
        total_amount: ordersNow[i].total_amount,
        total_items: ordersNow[i].total_items,
        total_prise: ordersNow[i].total_prise,
        userId: userId,
        shopId: ordersNow[i].shopId
      }
    })

    for (const cartItem of ordersNow[i].cartItems) {
      const resCartItem = await prisma.order_item.create({
        data: {
          orderId: resOrder.id,
          productId: cartItem.product.id,
          quantityProduct: cartItem.quantityInCart,
          priceCartItem: cartItem.priceCartItem
          /* cartItem.product.price *
              cartItem.quantityInCart *
              cartItem.product.min_quantity */
        }
      })
      if (cartItem.deliveryId === 'now') {
        await prisma.product.update({
          where: { id: cartItem.product.id },
          data: {
            quantity: {
              decrement: cartItem.quantityInCart * cartItem.product.min_quantity
            }
          }
        })
      }
    }
  }
  //=======================
  const ordersOther = orders.filter(order => order.dateOrder !== 'сейчас')
  for (let i = 0; i < ordersOther.length; i++) {
    const resOrder = await prisma.pre_order.create({
      data: {
        total_amount: ordersOther[i].total_amount,
        total_items: ordersOther[i].total_items,
        total_prise: ordersOther[i].total_prise,
        userId: userId,
        shopId: ordersOther[i].shopId
      }
    })

    for (const cartItem of ordersOther[i].cartItems) {
      const resPreOrderItem = await prisma.pre_order_item.create({
        data: {
          pre_orderId: resOrder.id,
          productId: cartItem.product.id,
          quantityProduct: cartItem.quantityInCart,
          delivery_itemId: cartItem.deliveryId,

          priceCartItem: cartItem.priceCartItem
          /* cartItem.product.price *
              cartItem.quantityInCart *
              cartItem.product.min_quantity */
        }
      })

      await prisma.delivery_item.update({
        where: {
          id: resPreOrderItem.delivery_itemId ?? undefined
        },
        data: {
          quantity: {
            decrement: cartItem.quantityInCart * cartItem.product.min_quantity
          }
        }
      })
    }
  }

  revalidatePath('/', 'layout')
}
