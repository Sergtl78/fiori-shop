import { Prisma } from '@prisma/client'

export const mockMain_categories: Prisma.Main_categoryCreateInput[] = [
  {
    name: 'Цветы',
    slug: 'flowers',
    visible: true,
    order: 'a'
  },
  {
    name: 'Зелень',
    slug: 'greens',
    visible: true,
    order: 'b'
  }
]
