import { PrismaClient } from '@prisma/client'
import { mockCategories } from './mosk/categories'
import { mockCollections } from './mosk/collection'
import { mockColors } from './mosk/colors'
import { mockImages } from './mosk/images'
import { mockMain_categories } from './mosk/main_categories'
import { mockProducts } from './mosk/products'
import { mockShopUsers } from './mosk/shop'
import { mockSliderPromo } from './mosk/slider_promo'
import { mockSub_categories } from './mosk/sub_categories'
import { mockUsers } from './mosk/user'
import { mockVendors } from './mosk/vendors'

const prisma = new PrismaClient()

async function main() {
  //Delete All
  await prisma.$transaction([
    prisma.shop.deleteMany(),
    prisma.user.deleteMany(),
    prisma.main_category.deleteMany(),
    prisma.category.deleteMany(),
    prisma.sub_category.deleteMany(),
    prisma.vendor.deleteMany(),
    prisma.color.deleteMany(),
    prisma.order.deleteMany(),
    prisma.product.deleteMany(),
    prisma.collection.deleteMany(),
    prisma.image.deleteMany(),
    prisma.slider_promo.deleteMany()
  ])

  //users shop
  await prisma.shop.createMany({
    data: mockShopUsers
  })
  console.log('users shop created')

  //users

  for (const u of mockUsers) {
    await prisma.user.create({
      data: u
    })
  }
  console.log('users created')

  //Main Categories

  for (const mc of mockMain_categories) {
    await prisma.main_category.create({
      data: mc
    })
  }
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
