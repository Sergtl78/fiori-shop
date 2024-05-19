import { formatDate } from '@/lib/utils'
import { Status } from '@prisma/client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getPre_orders } from '../../_lib/api/pre_orders'

export type OrderState = {
  id: string
  numberOrder: number
  price: number | string
  userShop: string
  status: Status
  deliveryOrder?: string
}

export type State = {
  orders: OrderState[]
  draggedOrder: string | null
}

const initOrders = async () => {
  const res = await getPre_orders()
  const mapRes = res.map(order => {
    return {
      id: order.id,
      numberOrder: order.number_order,
      price: order.total_prise,
      userShop: order.Shop?.name || '',
      status: order.status,
      deliveryOrder: formatDate(
        order.pre_order_items[0].Delivery_item?.dateDelivery_item
      )
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

export const usePre_orderStore = create<State & Actions>()(
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
