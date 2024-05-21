import { Prisma } from '@prisma/client'

export const mockSub_categories: Prisma.Sub_categoryCreateInput[] = [
  {
    name: 'Кустовая',
    slug: 'bush',
    sort_order: 'a',
    Main_category: { connect: { slug: 'flowers' } },
    Category: { connect: { slug: 'roses' } }
  },
  {
    name: 'Пионовидная',
    slug: 'peony',
    sort_order: 'b',
    Main_category: { connect: { slug: 'flowers' } },
    Category: { connect: { slug: 'roses' } }
  },
  {
    name: 'Одноголовая',
    slug: 'one-head',
    sort_order: 'c',
    Main_category: { connect: { slug: 'flowers' } },
    Category: { connect: { slug: 'roses' } }
  }
]
