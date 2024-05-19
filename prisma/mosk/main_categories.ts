import { Prisma } from '@prisma/client'

export const mockMain_categories: Prisma.Main_categoryCreateInput[] = [
  {
    name: 'Цветы',
    slug: 'flowers',
    sort_order: 'a'
  },
  {
    name: 'Зелень',
    slug: 'greens',
    sort_order: 'b'
  }
]
