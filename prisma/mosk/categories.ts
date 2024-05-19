import { Prisma } from '@prisma/client'

export const mockCategories: Prisma.CategoryCreateInput[] = [
  {
    name: 'Розы',
    slug: 'roses',
    sort_order: 'a',
    Main_category: { connect: { slug: 'flowers' } }
  },
  {
    name: 'Хризантемы',
    slug: 'chrysanthemum',
    sort_order: 'b',
    Main_category: { connect: { slug: 'flowers' } }
  },
  {
    name: 'Лимониумы',
    slug: 'limoniums',
    sort_order: 'c',
    Main_category: { connect: { slug: 'flowers' } }
  },
  {
    name: 'Подсолнечники',
    slug: 'sunflower',
    sort_order: 'd',
    Main_category: { connect: { slug: 'flowers' } }
  },
  {
    name: 'Solidago',
    slug: 'solidago',
    sort_order: 'e',
    Main_category: { connect: { slug: 'greens' } }
  },
  {
    name: 'Тюльпаны',
    slug: 'tulip',
    sort_order: 'f',
    Main_category: { connect: { slug: 'flowers' } }
  },
  {
    name: 'Пионы',
    slug: 'pions',
    sort_order: 'g',
    Main_category: { connect: { slug: 'flowers' } }
  },
  {
    name: 'Герберы',
    slug: 'gerbers',
    sort_order: 'h',
    Main_category: { connect: { slug: 'flowers' } }
  }
]
