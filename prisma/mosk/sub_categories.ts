import { Prisma } from '@prisma/client'

export const mockSub_categories: Prisma.Sub_categoryCreateInput[] = [
  {
    name: 'Кустовая',
    slug: 'Bush',
    sort_order: 'a',
    Main_category: { connect: { slug: 'flowers' } },
    Category: { connect: { slug: 'roses' } }
  },
  {
    name: 'Пионовидная',
    slug: 'Peony',
    sort_order: 'b',
    Main_category: { connect: { slug: 'flowers' } },
    Category: { connect: { slug: 'roses' } }
  },
  {
    name: 'Одноголовая',
    slug: 'One-headed',
    sort_order: 'c',
    Main_category: { connect: { slug: 'flowers' } },
    Category: { connect: { slug: 'roses' } }
  }
]
