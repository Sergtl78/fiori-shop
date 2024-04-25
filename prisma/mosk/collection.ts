import { Prisma } from '@prisma/client'

export const mockCollections: Prisma.CollectionCreateInput[] = [
  {
    name: 'Акция -10%',
    slug: 'action',
    order: 'a',
    visible: true,
    discount: 10,
    icon: 'https://test-for-flower.storage.yandexcloud.net/sale_tag.png',
    products: {
      connect: [
        { slug: 'coral-sunset' },
        { slug: 'miss-america' },
        { slug: 'english-miss' },
        { slug: 'princess-anne' },
        { slug: 'freedom' },
        { slug: 'explore' },
        { slug: 'monarch' },
        { slug: 'statice-pink' }
      ]
    }
  },
  {
    name: 'Топ продаж',
    slug: 'top-seller',
    order: 'b',
    visible: true,
    icon: 'https://test-for-flower.storage.yandexcloud.net/top_icon.png',
    products: {
      connect: [
        { slug: 'miss-america' },
        { slug: 'english-miss' },
        { slug: 'princess-anne' },
        { slug: 'freedom' },
        { slug: 'explore' },
        { slug: 'monarch' },
        { slug: 'statice-blue' },
        { slug: 'heliantus-vincent-choice' }
      ]
    }
  }
]
