import { Status } from '@prisma/client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getOrders } from '../../_lib/api/orders'

export type OrderState = {
  id: string
  numberOrder: number
  price: number | string
  userShop: string
  status: Status
  deliveryOrder?: string
  createdAt?: string
}

export type State = {
  orders: OrderState[]
  draggedOrder: string | null
}

const initOrders = async () => {
  const res = await getOrders()
  const mapRes = res.map(order => {
    return {
      id: order.id,
      numberOrder: order.number_order,
      price: order.total_prise,
      userShop: order.Shop?.name || '',
      status: order.status,
      createdAt: order.createdAtFormatted
    }
  })
  return mapRes
}

export type Actions = {
  setInitials: () => void
  //addOrder: (price: string, userShop: string) => void
  dragOrder: (id: string | null) => void
  removeOrder: (price: string) => void
  updateOrder: (price: string, status: Status) => void
}

export const useOrderStore = create<State & Actions>()(
  persist(
    set => ({
      orders: [],
      draggedOrder: null,
      setInitials: async () => {
        const orders = await initOrders()
        set({ orders })
      },
      /* addOrder: (price: string, userShop: string) =>
        set(state => ({
          orders: [
            ...state.orders,
            { id: createId(), price, userShop, status: 'NEW' }
          ]
        })), */
      dragOrder: (id: string | null) => set({ draggedOrder: id }),
      removeOrder: (id: string) =>
        set(state => ({
          orders: state.orders.filter(order => order.id !== id)
        })),
      updateOrder: (id: string, status: Status) =>
        set(state => ({
          orders: state.orders.map(order =>
            order.id === id ? { ...order, status } : order
          )
        }))
    }),
    { name: 'order-store', skipHydration: true }
  )
)
