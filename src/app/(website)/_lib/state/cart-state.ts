import { createId } from '@paralleldrive/cuid2'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { ResProductBySlug } from '../api/result-types'

export type CartItem = {
  id: string
  product: ResProductBySlug
  quantityInCart: number //количество добавленных упаковок в корзину
  dataDelivery: number | string | Date
  deliveryId?: string
  priceCartItem: number
}
type State = {
  cart: CartItem[]
  shopId?: string
}

type Actions = {
  addFromCart: (product: ResProductBySlug, count: number) => void
  removeFromCart: (id: string, count: number) => void
  removeItemCart: (id: string) => void
  clearCart: () => void
  serShopId: (id: string) => void
}

export const useCartStore = createWithEqualityFn<State & Actions>()(
  persist(
    immer(
      devtools(
        (set, get) => ({
          cart: [],

          addFromCart: (product: ResProductBySlug, count: number) => {
            const { cart } = get()
            const itemInCart = cart.filter(
              cartItem => cartItem.product.id === product.id
            )

            const needCount = !!itemInCart
              ? itemInCart.reduce((acc, item) => acc + item.quantityInCart, 0) +
                count
              : count

            let newCart: CartItem[] = cart.filter(
              item => item.product.id !== product.id
            )

            if (needCount <= product.quantity / product.min_quantity) {
              newCart.push({
                product,
                id: createId(),
                quantityInCart: needCount,
                dataDelivery: /* new Date(Date.now()) */ 'сейчас',
                deliveryId: 'now',
                priceCartItem: needCount * product.price * product.min_quantity
              })
            } else {
              newCart.push({
                product,
                id: createId(),
                dataDelivery: /* new Date(Date.now()) */ 'сейчас',
                quantityInCart: Math.floor(
                  product.quantity / product.min_quantity
                ),
                deliveryId: 'now',
                priceCartItem:
                  Math.floor(product.quantity / product.min_quantity) *
                  product.price *
                  product.min_quantity
              })

              let needProductAvail =
                needCount - Math.floor(product.quantity / product.min_quantity)

              const deliveryNoRegistered = product.delivery_items.filter(
                item => item.Delivery?.statusDelivery !== 'REGISTERED'
              )

              for (let i = 0; i < deliveryNoRegistered.length; i++) {
                if (needProductAvail <= 0) break
                const availPackage = Math.floor(
                  deliveryNoRegistered[i].quantity / product.min_quantity
                )
                if (needProductAvail <= availPackage) {
                  newCart.push({
                    product,
                    id: createId(),
                    quantityInCart: needProductAvail,
                    dataDelivery: deliveryNoRegistered[i].dateDelivery_item,
                    deliveryId: deliveryNoRegistered[i].id,
                    priceCartItem:
                      needProductAvail *
                      deliveryNoRegistered[i].price *
                      product.min_quantity
                  })
                  needProductAvail = 0
                } else {
                  newCart.push({
                    product,
                    id: createId(),
                    quantityInCart: availPackage,
                    dataDelivery: deliveryNoRegistered[i].dateDelivery_item,
                    deliveryId: deliveryNoRegistered[i].id,
                    priceCartItem:
                      availPackage *
                      deliveryNoRegistered[i].price *
                      product.min_quantity
                  })
                  needProductAvail -= availPackage
                }
              }
            }
            const sortedCart = newCart
              .filter(item => item.quantityInCart > 0)
              /* .filter(
                item =>
                  item.product.delivery_items[0]?.Delivery?.statusDelivery !==
                  'REGISTERED'
              ) */
              .sort((a, b) => a.product.name.localeCompare(b.product.name))
              .sort(
                (a, b) =>
                  new Date(b.dataDelivery).getDay() -
                  new Date(a.dataDelivery).getDay()
              )

            set({ cart: sortedCart }, false, 'cart/addFromCart')
          },
          removeFromCart: (id: string, count: number) => {
            const { cart } = get()
            const itemInCart = cart.find(cartItem => cartItem.id === id)

            const newCart =
              !!itemInCart && itemInCart.quantityInCart > count
                ? cart.map(item =>
                    item.id === id
                      ? { ...item, quantityInCart: item.quantityInCart - count }
                      : item
                  )
                : cart.filter(item => item.id !== id)

            set({ cart: newCart }, false, 'cart/removeFromCart')
          },
          removeItemCart: (id: string) => {
            const { cart } = get()
            const newCart = cart.filter(item => item.id !== id)
            set({ cart: newCart }, false, 'cart/removeItemCart')
          },

          clearCart: () => set({ cart: [] }, false, 'cart/clearCart'),
          serShopId: (id: string) => {
            set({ shopId: id }, false, 'cart/serShopId')
          }
        }),

        { name: 'cart' }
      )
    ),
    { name: 'cart' }
  ),
  shallow
)
