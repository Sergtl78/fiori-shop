import { Prisma } from '@prisma/client'

export const mockShopUsers: Prisma.ShopCreateInput[] = [
  {
    name: 'Цветы Даром',
    id: 'free-flowers',
    street: 'Кустовая',
    house: '2г'
    //User: { connect: { email: 'igor@test.com' } }
  },

  {
    name: 'Цветы Даром',
    id: 'free-flowers2',
    street: 'Ленина',
    house: '13'
    //User: { connect: { email: 'igor@test.com' } }
  },
  {
    name: 'Super Shop',
    id: 'super-shop',
    street: 'Ванеева',
    house: '131'
    //User: { connect: { email: 'vlad@test.com' } }
  },
  {
    name: 'Моя Радость',
    id: 'my-joy',
    street: 'Гагарина',
    house: '25'
    //User: { connect: { email: 'elena@test.com' } }
  },
  {
    name: 'Счастье',
    id: 'happy',
    street: 'Минина',
    house: '1ю'
    //User: { connect: { email: 'anna@test.com' } }
  }
]
