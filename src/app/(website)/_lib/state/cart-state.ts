import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { ResProductBySlug } from '../api/product'

export type CartItem = ResProductBySlug & {
  quantityInCart: number
}
type State = {
  cart: CartItem[]
}

type Actions = {
  addFromCart: (product: ResProductBySlug, count: number) => void
  removeFromCart: (id: string, count: number) => void
  removeItemCart: (id: string) => void
  clearCart: () => void
}

export const useCartStore = createWithEqualityFn<State & Actions>()(
  persist(
    immer(
      devtools(
        (set, get) => ({
          cart: [],

          addFromCart: (product: ResProductBySlug, count: number) => {
            const { cart } = get()
            const itemInCart = cart.find(cartItem => cartItem.id === product.id)
            const newCart: CartItem[] = !!itemInCart
              ? cart.map(item =>
                  item.id === product.id
                    ? { ...item, quantityInCart: item.quantityInCart + count }
                    : item
                )
              : [...cart, { ...product, quantityInCart: count }]

            set({ cart: newCart }, false, 'cart/addFromCart')
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

          clearCart: () => set({ cart: [] }, false, 'cart/clearCart')
        }),
        { name: 'cart' }
      )
    ),
    { name: 'cart' }
  ),
  shallow
)
