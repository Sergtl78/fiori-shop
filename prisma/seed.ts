import { Prisma, PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'
import CategoriesJson from './data/categories.json'
import ColorsJson from './data/colors.json'
import ImagesJson from './data/images.json'
import MainCategoriesJson from './data/mainCategories.json'
import ProductsJson from './data/products.json'
import SubCategoriesJson from './data/sub_categories.json'
import VendorsJson from './data/vendor.json'

const prisma = new PrismaClient()

const dataMainCategories: Prisma.Main_categoryCreateInput[] =
  MainCategoriesJson.data.mainCategories.data.map(category => {
    return {
      name: category.attributes.name
    }
  })
const dataCategories: Prisma.CategoryCreateInput[] =
  CategoriesJson.data.categories.data.map(category => {
    return {
      name: category.attributes.name
    }
  })
const dataSubCategories: Prisma.Sub_categoryCreateInput[] =
  SubCategoriesJson.data.subCategories.data.map(category => {
    return {
      name: category.attributes.name
    }
  })
const dataVendor: Prisma.VendorCreateInput[] =
  VendorsJson.data.vendors.data.map(vendor => {
    return {
      name: vendor.attributes.name
    }
  })
const dataColors: Prisma.ColorCreateInput[] = ColorsJson.data.colors.data.map(
  color => {
    return {
      name: color.attributes.name,
      hex: color.attributes.value
    }
  }
)
const dataProducts: Prisma.ProductCreateInput[] =
  ProductsJson.data.products.data.map(product => {
    return {
      name: product.attributes.name,
      sku: product.attributes.sku,
      price: product.attributes.price,
      quantity: product.attributes.quantity,
      min_quantity: product.attributes.min_quantity,
      growth: product.attributes.growth,
      delivery: new Date(product.attributes.delivery),
      description: product.attributes.description[0].children[0].text.toString()
    }
  })

const dataImages: Prisma.ImageCreateInput[] =
  ImagesJson.data.uploadFiles.data.map(image => {
    return {
      name: image.attributes.name,
      url: image.attributes.url
    }
  })
async function main() {
  function hashPassword(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  }
  const passwordAdmin = hashPassword('qwerty')
  const passwordBob = hashPassword('qwerty')
  const admin = await prisma.user.upsert({
    where: { email: 'admin@admin.ru' },
    update: {
      email: 'admin@admin.ru',
      password: passwordAdmin,
      roles: ['USER', 'ADMIN']
    },
    create: {
      email: 'admin@admin.ru',
      password: passwordAdmin,
      roles: ['USER', 'ADMIN']
    }
  })
  const bob = await prisma.user.upsert({
    where: { email: 'bob@test.ru' },
    update: {
      email: 'bob@test.ru',
      password: passwordBob,
      roles: ['USER']
    },
    create: {
      email: 'bob@test.ru',
      password: passwordBob,
      roles: ['USER']
    }
  })
  console.log({ admin, bob })
  //Main Categories
  /* const mainCategories = await prisma.main_category.createMany({
    data: dataMainCategories
  })
  console.log({ mainCategories })

  //Categories
  const categories = await prisma.category.createMany({
    data: dataCategories
  })
  console.log({ categories })

  //Sub Categories
  const subCategories = await prisma.sub_category.createMany({
    data: dataSubCategories
  })
  console.log({ subCategories })

  //Vendors
  const vendors = await prisma.vendor.createMany({
    data: dataVendor
  })
  console.log({ vendors })

  //Colors
  const colors = await prisma.color.createMany({
    data: dataColors
  })
  console.log({ colors }) */

  //Products
  /*  const products = await prisma.product.createMany({
    data: dataProducts
  })
  console.log({ products }) */

  //images
  /*  const images = await prisma.image.createMany({
    data: dataImages
  }) */
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
