import { Prisma } from '@prisma/client'

export const ordersInclude = {
  User: {
    select: { name: true, lastName: true, id: true, personalDiscount: true }
  },
  Shop: true,
  order_items: {
    select: {
      id: true,
      orderId: true,
      priceCartItem: true,
      productId: true,
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
      quantityProduct: true
    },
    orderBy: { id: 'asc' }
  }
} satisfies Prisma.OrderInclude
