import { Prisma } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

function hashPassword(password: string) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export const mockUsers: Prisma.UserCreateInput[] = [
  {
    name: 'Admin',
    email: 'admin@admin.com',
    password: hashPassword('qwerty'),
    role: 'ADMIN',
    image:
      'https://test-for-flower.storage.yandexcloud.net/avatar/amy_burns_e71e6358e2.png'
  },
  {
    name: 'Bob',
    email: 'bob@test.com',
    password: hashPassword('qwerty'),
    role: 'USER',
    image:
      'https://test-for-flower.storage.yandexcloud.net/avatar/guillermo_rauch_d070c0af0e.png'
  },
  {
    name: 'Jon',
    email: 'jon@test.com',
    password: hashPassword('qwerty'),
    image:
      'https://test-for-flower.storage.yandexcloud.net/avatar/hector_simpson_9ef77f2ad6.png'
  },
  {
    name: 'Ivan',
    email: 'ivan@test.com',
    password: hashPassword('qwerty'),
    role: 'USER',
    image:
      'https://test-for-flower.storage.yandexcloud.net/avatar/jared_palmer_ee192f240f.png'
  },
  {
    name: 'Igor',
    email: 'igor@test.com',
    password: hashPassword('qwerty'),
    image:
      'https://test-for-flower.storage.yandexcloud.net/avatar/lee_robinson_4857f96aff.png'
  },
  {
    name: 'Vlad',
    email: 'vlad@test.com',
    password: hashPassword('qwerty'),
    image:
      'https://test-for-flower.storage.yandexcloud.net/avatar/michael_novotny_73acfe7de2.png'
  },
  {
    name: 'Elena',
    email: 'elena@test.com',
    password: hashPassword('qwerty'),
    image:
      'https://test-for-flower.storage.yandexcloud.net/avatar/steph_dietz_344159fd29.png'
  },
  {
    name: 'Anna',
    email: 'anna@test.com',
    password: hashPassword('qwerty'),
    image:
      'https://test-for-flower.storage.yandexcloud.net/avatar/steven_tey_34dca8a304.png'
  }
]
