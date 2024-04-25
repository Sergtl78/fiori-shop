import { CartItem } from '@/app/(website)/_lib/state/cart-state'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return Number(price).toLocaleString('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0
  })
}
export function getOldPrice({
  price,
  discount
}: {
  price: number
  discount: number
}): string {
  const oldPrice = Math.round((price * discount) / 100 + price)
  return Number(oldPrice).toLocaleString('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0
  })
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('ru-RU').format(date)
}

export const getCartItemsTotal = (cart: CartItem[]) => {
  return cart.reduce(
    (total, item) => total + item.quantityInCart * item.min_quantity,
    0
  )
}
export const getCartTotal = (cart: CartItem[]) => {
  return cart.reduce(
    (total, item) =>
      total + item.price * item.quantityInCart * item.min_quantity,
    0
  )
}
export const discountCollections = (collections: CartItem['collections']) => {
  return collections.reduce((acc, item) => (acc += item.discount || 0), 0) ?? 0
}
