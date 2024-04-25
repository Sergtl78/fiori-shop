import { PrismaClient } from '@prisma/client'
import { mockCategories } from './mosk/categories'
import { mockCollections } from './mosk/collection'
import { mockColors } from './mosk/colors'
import { mockImages } from './mosk/images'
import { mockMain_categories } from './mosk/main_categories'
import { mockProducts } from './mosk/products'
import { mockSliderPromo } from './mosk/slider_promo'
import { mockSub_categories } from './mosk/sub_categories'
import { mockUsers } from './mosk/user'
import { mockVendors } from './mosk/vendors'

const prisma = new PrismaClient()

async function main() {
  //Delete All
  await prisma.$transaction([
    prisma.user.deleteMany(),
    prisma.main_category.deleteMany(),
    prisma.category.deleteMany(),
    prisma.sub_category.deleteMany(),
    prisma.vendor.deleteMany(),
    prisma.color.deleteMany(),
    prisma.order.deleteMany(),
    prisma.cart_item.deleteMany(),
    prisma.product.deleteMany(),
    prisma.image.deleteMany(),
    prisma.collection.deleteMany(),

    prisma.slider_promo.deleteMany()
  ])
  //users
  await prisma.user.createMany({
    data: mockUsers
  })
  console.log('users created')
  //Main Categories
  mockMain_categories.forEach(async mc => {
    await prisma.main_category.create({ data: mc })
  })

  console.log('main categories created')

  //categories
  for (const c of mockCategories) {
    await prisma.category.create({
      data: c
    })
  }

  console.log('categories created')

  //sub categories
  for (const sc of mockSub_categories) {
    await prisma.sub_category.create({
      data: sc
    })
  }

  console.log('sub categories created')

  //vendors
  for (const v of mockVendors) {
    await prisma.vendor.create({
      data: v
    })
  }

  console.log('vendors created')

  //colors
  for (const c of mockColors) {
    await prisma.color.create({
      data: c
    })
  }

  console.log('colors created')

  //images
  for (const i of mockImages) {
    await prisma.image.create({
      data: i
    })
  }

  console.log('images created')

  //products
  for (const p of mockProducts) {
    await prisma.product.create({
      data: p
    })
  }

  console.log('products created')

  //collections
  for (const c of mockCollections) {
    await prisma.collection.create({
      data: c
    })
  }
  console.log('collections created')

  //orders
  const [coral, freedom] = await prisma.product.findMany({
    where: {
      OR: [{ slug: 'coral-sunset' }, { slug: 'freedom' }]
    }
  })
  const quantityCoral = 1
  const quantityFreedom = 3
  const priceCoral = quantityCoral * coral.min_quantity * coral.price
  const priceFreedom = quantityFreedom * freedom.min_quantity * freedom.price

  await prisma.order.create({
    data: {
      status: 'PENDING',
      total_amount: priceCoral + priceFreedom,
      total_quantity:
        quantityCoral * coral.min_quantity +
        quantityFreedom * freedom.min_quantity,
      User: {
        connect: { email: 'bob@test.com' }
      },
      cart_items: {
        create: [
          {
            quantityProduct: quantityCoral,
            priceCartItem: priceCoral,
            productId: coral.id
            /* Product: {
              connect: { slug: coral.slug }
            } */
          },
          {
            quantityProduct: quantityFreedom,
            priceCartItem: priceFreedom,
            productId: freedom.id
            /* Product: {
              connect: { slug: freedom.slug }
            } */
          }
        ]
      }
    }
  })
  console.log('orders created')
  //slider_promo
  await prisma.slider_promo.createMany({
    data: mockSliderPromo
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
