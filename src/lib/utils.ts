import { CartItem } from '@/app/(website)/_lib/state/cart-state'
import { Collection } from '@prisma/client'
import { clsx, type ClassValue } from 'clsx'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
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

export function formatDate(date?: Date | string | number): string {
  if (!date) return ''
  if (date === 'сейчас') return date
  return format(date, 'dd MMM', {
    locale: ru
  })

  /* new Intl.DateTimeFormat('ru-RU').format(date) */
}

export const getCartItemsTotal = (cart: CartItem[]) => {
  if (!cart.length || cart.length < 1) return 0
  const res = cart.reduce(
    (total, item) => total + item.quantityInCart * item.product.min_quantity,
    0
  )
  return res
}
export const getCartTotal = (cart: CartItem[]) => {
  return cart.reduce((total, item) => total + item.priceCartItem, 0)
}
export const discountCollections = (collections: Collection[]) => {
  if (!collections || collections.length < 1) return 0
  return collections.reduce((acc, item) => (acc += item.discount || 0), 0) ?? 0
}
export const formatPhoneForInput = (value?: string) => {
  let res = ''
  if (!value) return
  if (value === '') {
    res = ''
  }
  if (value.length <= 10) {
    res = value
  }
  if (value.length > 10) {
    res = value.trim().replace(/\D/g, '').slice(1)
  }
  return res
}
export const formatPhoneForSave = (phone?: string | null) => {
  if (!phone) {
    return ''
  }
  return `+7 (${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 8)}-${phone.slice(8, 10)}`
}
export const formatOrderNumber = (orderNumber: number) => {
  const int = new Intl.NumberFormat('ru-RU', {
    minimumIntegerDigits: 6
  })
  return int.format(orderNumber)
}
