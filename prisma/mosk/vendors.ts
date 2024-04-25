import { Prisma } from '@prisma/client'

export const mockVendors: Prisma.VendorCreateInput[] = [
  {
    name: 'Эквадор',
    slug: 'Ecuador',
    order: 'a'
  },
  {
    name: 'Голландия',
    slug: 'Holland',
    order: 'b'
  },
  {
    name: 'Кения',
    slug: 'Kenya',
    order: 'c'
  },
  {
    name: 'Нидерланды',
    slug: 'Netherlands',
    order: 'd'
  }
]
