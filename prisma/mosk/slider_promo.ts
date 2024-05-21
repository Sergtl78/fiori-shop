import { Prisma } from '@prisma/client'

export const mockSliderPromo: Prisma.Slider_promoCreateInput[] = [
  {
    title: 'Прекрасные розы',
    description: 'Выгодные цены, большой выбор',
    image:
      'https://test-for-flower.storage.yandexcloud.net/slider_promo/slide1.webp',
    url: '/catalog/flowers/roses'
  },
  {
    title: 'Шикарные пионы',
    description: 'Богатая палитра оттенков, выгодные цены, большой выбор',
    image:
      'https://test-for-flower.storage.yandexcloud.net/slider_promo/slide2.webp',
    url: '/catalog/flowers/pions'
  },
  {
    title: 'Яркие хризантемы',
    description: 'Широкий выбор, выгодные цены',
    image:
      'https://test-for-flower.storage.yandexcloud.net/slider_promo/slide3.webp',
    url: '/catalog/flowers/chrysanthemum'
  }
]
