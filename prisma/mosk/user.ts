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
    name: 'Мария',
    email: 'fiorioptnn@gmail.com',
    password: hashPassword('qwerty'),
    role: 'ADMIN',
    image: 'https://test-for-flower.storage.yandexcloud.net/avatar/maria.jpg'
  },

  {
    name: 'Иван',
    email: 'ivan@test.com',
    password: hashPassword('qwerty'),
    role: 'MANAGER',
    image:
      'https://test-for-flower.storage.yandexcloud.net/avatar/jared_palmer_ee192f240f.png'
  },

  {
    name: 'Игорь',
    middleName: 'Анатольевич',
    lastName: 'Иванов',
    tin: '1234567890',
    email: 'igor@test.com',
    phone: '+7 (999) 999-99-99',
    role: 'USER',
    password: hashPassword('qwerty'),
    image:
      'https://test-for-flower.storage.yandexcloud.net/avatar/lee_robinson_4857f96aff.png',
    shops: { connect: [{ id: 'free-flowers' }, { id: 'free-flowers2' }] }
  },
  {
    name: 'Влад',
    middleName: 'Александрович',
    lastName: 'Сидоров',
    tin: '1234567890',
    email: 'vlad@test.com',
    phone: '+7 (999) 999-99-00',
    role: 'USER',
    password: hashPassword('qwerty'),
    image:
      'https://test-for-flower.storage.yandexcloud.net/avatar/michael_novotny_73acfe7de2.png',
    shops: { connect: [{ id: 'super-shop' }] },
    personalDiscount: 10
  },
  {
    name: 'Елена',
    middleName: 'Анатольевна',
    lastName: 'Егорова',
    tin: '1234599999',
    email: 'elena@test.com',
    phone: '+7 (999) 999-99-88',
    role: 'USER',
    password: hashPassword('qwerty'),
    image:
      'https://test-for-flower.storage.yandexcloud.net/avatar/steph_dietz_344159fd29.png',
    shops: { connect: [{ id: 'my-joy' }] }
  },
  {
    name: 'Анна',
    middleName: 'Андреевна',
    lastName: 'Антонова',
    tin: '1234599998',
    email: 'anna@test.com',
    phone: '+7 (999) 999-99-77',
    role: 'USER',
    password: hashPassword('qwerty'),
    image:
      'https://test-for-flower.storage.yandexcloud.net/avatar/steven_tey_34dca8a304.png',
    shops: { connect: [{ id: 'happy' }] }
  },
  {
    name: 'Bob',
    email: 'bob@test.com',
    password: hashPassword('qwerty'),
    image:
      'https://test-for-flower.storage.yandexcloud.net/avatar/guillermo_rauch_d070c0af0e.png'
  },
  {
    blocked: true,
    name: 'Jon',
    email: 'jon@test.com',
    password: hashPassword('qwerty'),
    image:
      'https://test-for-flower.storage.yandexcloud.net/avatar/hector_simpson_9ef77f2ad6.png'
  }
]
