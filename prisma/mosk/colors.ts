import { Prisma } from '@prisma/client'

export const mockColors: Prisma.ColorCreateInput[] = [
  {
    name: 'Белый',
    hex: '#ffffff',
    slug: 'white'
  },
  {
    name: 'Красный',
    hex: '#ff0000',
    slug: 'red'
  },
  {
    name: 'Фиолетовый',
    hex: '#bf00ff',
    slug: 'violet'
  },
  {
    name: 'Оранжевый',
    hex: '#fd8e06',
    slug: 'orange'
  },
  {
    name: 'Желтый',
    hex: '#f9d903',
    slug: 'yellow'
  },
  {
    name: 'Синий',
    hex: '#1200ff',
    slug: 'blue'
  },
  {
    name: 'Бордовый',
    hex: '#8c0202',
    slug: 'dark-red'
  },
  {
    name: 'Розовый',
    hex: '#e600e6',
    slug: 'pink'
  },
  {
    name: 'Бежевый',
    hex: '#f6cfcf',
    slug: 'beige'
  }
]
