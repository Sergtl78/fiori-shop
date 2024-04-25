import { Prisma } from '@prisma/client'

export const mockCategories: Prisma.CategoryCreateInput[] = [
  {
    name: 'Розы',
    slug: 'roses',
    visible: true,
    order: 'a',
    Main_category: { connect: { slug: 'flowers' } }
  },
  {
    name: 'Хризантемы',
    slug: 'chrysanthemum',
    visible: true,
    order: 'b',
    Main_category: { connect: { slug: 'flowers' } }
  },
  {
    name: 'Лимониумы',
    slug: 'limoniums',
    visible: true,
    order: 'c',
    Main_category: { connect: { slug: 'flowers' } }
  },
  {
    name: 'Подсолнечники',
    slug: 'sunflower',
    visible: true,
    order: 'd',
    Main_category: { connect: { slug: 'flowers' } }
  },
  {
    name: 'Solidago',
    slug: 'solidago',
    visible: true,
    order: 'e',
    Main_category: { connect: { slug: 'greens' } }
  },
  {
    name: 'Тюльпаны',
    slug: 'tulip',
    visible: true,
    order: 'f',
    Main_category: { connect: { slug: 'flowers' } }
  },
  {
    name: 'Пионы',
    slug: 'pions',
    visible: true,
    order: 'g',
    Main_category: { connect: { slug: 'flowers' } }
  },
  {
    name: 'Герберы',
    slug: 'gerbers',
    visible: true,
    order: 'h',
    Main_category: { connect: { slug: 'flowers' } }
  }
]
