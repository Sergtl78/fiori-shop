import { Prisma } from '@prisma/client'

export const mockCollections: Prisma.CollectionCreateInput[] = [
  {
    name: 'Акция -10%',
    slug: 'action',
    sort_order: 'a',
    discount: 10,
    icon: 'https://test-for-flower.storage.yandexcloud.net/sale_tag.png',
    products: {
      connect: [
        { slug: 'coral-sunset' },
        { slug: 'miss-america' },
        { slug: 'english-miss' },
        { slug: 'princess-anne' },
        { slug: 'freedom' },
        { slug: 'explorer' },
        { slug: 'monarch' },
        { slug: 'statice-pink' }
      ]
    }
  },
  {
    name: 'Топ продаж',
    slug: 'top-seller',
    sort_order: 'b',
    icon: 'https://test-for-flower.storage.yandexcloud.net/top_icon.png',
    products: {
      connect: [
        { slug: 'miss-america' },
        { slug: 'english-miss' },
        { slug: 'princess-anne' },
        { slug: 'freedom' },
        { slug: 'explorer' },
        { slug: 'monarch' },
        { slug: 'statice-blue' },
        { slug: 'heliantus-vincent-choice' }
      ]
    }
  },
  {
    name: 'Обратите внимание',
    slug: 'recommendation',
    sort_order: 'c',
    products: {
      connect: [
        { slug: 'miss-america' },
        { slug: 'english-miss' },
        { slug: 'princess-anne' },
        { slug: 'freedom' },
        { slug: 'explorer' },
        { slug: 'monarch' },
        { slug: 'statice-blue' },
        { slug: 'heliantus-vincent-choice' }
      ]
    }
  }
]
