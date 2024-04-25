import { Prisma } from '@prisma/client'

export const mockSub_categories: Prisma.Sub_categoryCreateInput[] = [
  {
    name: 'Кустовая',
    slug: 'Bush',
    order: 'a',
    Main_category: { connect: { slug: 'flowers' } },
    Category: { connect: { slug: 'roses' } }
  },
  {
    name: 'Пионовидная',
    slug: 'Peony',
    order: 'b',
    Main_category: { connect: { slug: 'flowers' } },
    Category: { connect: { slug: 'roses' } }
  },
  {
    name: 'Одноголовая',
    slug: 'One-headed',
    order: 'c',
    Main_category: { connect: { slug: 'flowers' } },
    Category: { connect: { slug: 'roses' } }
  }
]
