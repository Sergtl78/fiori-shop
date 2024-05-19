import { Status } from '@prisma/client'

export const colorStatus = (status: Status) => {
  switch (status) {
    case 'NEW':
      return 'border-blue-500'
    case 'PENDING':
      return 'border-fuchsia-500'
    case 'CONFIRMED':
      return 'border-orange-500'
    case 'PAID':
      return 'border-green-500'
    case 'FULFILLED':
      return 'border-gray-500'
    case 'CANCELLED':
      return 'border-red-500'
  }
}

export const colorBackgroundStatus = (status: Status) => {
  switch (status) {
    case 'NEW':
      return 'bg-blue-500'
    case 'PENDING':
      return 'bg-fuchsia-500'
    case 'CONFIRMED':
      return 'bg-orange-500'
    case 'PAID':
      return 'bg-green-500'
    case 'FULFILLED':
      return 'bg-gray-500'
    case 'CANCELLED':
      return 'bg-red-500'
  }
}