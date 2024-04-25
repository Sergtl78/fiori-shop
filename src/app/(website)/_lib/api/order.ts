import prisma from '@/lib/prisma'
import { getCartItemsTotal, getCartTotal } from '@/lib/utils'
import { CartItem } from '../state/cart-state'

type CreteOrderArgs = {
  cart: CartItem[]
  userId: string
}

export const createOrder = async ({ cart, userId }: CreteOrderArgs) => {
  const cartItems = cart.map(cartItem => {
    return {
      priceCartItem: cartItem.price,
      productId: cartItem.id,
      quantityProduct: cartItem.quantityInCart * cartItem.min_quantity
    }
  })
  const totalAmount = getCartTotal(cart)
  const totalQuantity = getCartItemsTotal(cart)
  const order = await prisma.order.create({
    data: {
      status: 'PENDING',
      User: { connect: { id: userId } },
      total_amount: totalAmount,
      total_quantity: totalQuantity,
      cart_items: {
        create: cartItems
      }
    }
  })
  return order
}
