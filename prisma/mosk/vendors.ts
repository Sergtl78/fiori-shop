import { Prisma } from '@prisma/client'

export const mockVendors: Prisma.VendorCreateInput[] = [
  {
    name: 'Эквадор',
    slug: 'Ecuador',
    sort_order: 'a'
  },
  {
    name: 'Голландия',
    slug: 'Holland',
    sort_order: 'b'
  },
  {
    name: 'Кения',
    slug: 'Kenya',
    sort_order: 'c'
  },
  {
    name: 'Россия',
    slug: 'Russia',
    sort_order: 'd'
  }
]
