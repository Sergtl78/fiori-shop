import { Prisma } from '@prisma/client'

export const mockCollections: Prisma.CollectionCreateInput[] = [
  {
    name: 'Акция -10%',
    slug: 'action',
    sort_order: 'a',
    discount: 10,
    icon: 'https://storage.yandexcloud.net/test-for-flower/icons/sale_tag.webp',
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
    icon: 'https://storage.yandexcloud.net/test-for-flower/icons/top_10.webp',
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
